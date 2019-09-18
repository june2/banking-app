import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as regression from 'regression';
import { Device } from './../device/device.entity';
import { Utilization } from './utilization.entity';
import { UtilizationRepository } from './utilization.repository';

@Injectable()
export class UtilizationService {
  constructor(
    @InjectRepository(Utilization)
    private readonly utilizationRepository: UtilizationRepository,
  ) { }

  async findAll(): Promise<Utilization[]> {
    return await this.utilizationRepository.find({ relations: ['device'] });
  }

  async findHighestDeviceByEachYear(): Promise<Utilization[]> {
    return await this.utilizationRepository.query(`
        SELECT a.device_name, a.device_id, b.rate, b.year FROM banking.device a
          inner Join (
            SELECT * from banking.utilization aa
            Inner join (
              SELECT year, MAX(rate) AS rate
              FROM banking.utilization 
              GROUP BY year
            )bb using (year, rate)
          ) b
          on a.device_id = b.device_id
          order by b.year
    `);
  }

  async findHighestDeviceByYear(year: number): Promise<Utilization> {
    return await this.utilizationRepository.findOne({ relations: ['device'], where: { year: year }, order: { rate: 'DESC' } })
  }

  async findHighestRateByDeviceId(device: Device): Promise<Utilization> {
    return await this.utilizationRepository.findOne({ relations: ['device'], where: { device: device }, order: { rate: 'DESC' } })
  }

  async predictRateByDeviceId(device: Device): Promise<Utilization> {
    const arr = await this.utilizationRepository.find({ relations: ['device'], where: { device: device }, order: { year: 'ASC' } })
    if (arr.length === 0) {
      return null;
    } else {
      let data = arr.map((obj, i) => [i, obj.rate]);
      const result = regression.linear(data);
      return new Utilization(null, arr[0].device, 2019, result.predict(data.length + 1)[1]);
    }
  }
}
