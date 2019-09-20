import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './../../api/device/device.entity';
import { DeviceRepository } from './../../api/device/device.repository';
import { Utilization } from './../../api/utilization/utilization.entity';
import { UtilizationRepository } from './../../api/utilization/utilization.repository';
import * as fs from 'fs';

export class BankingService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: DeviceRepository,
    @InjectRepository(Utilization)
    private readonly utilizationRepository: UtilizationRepository,
  ) {
    this.loadData();
  }

  async loadData(): Promise<Device[]> {
    const devices = [];
    const rate = [];
    let arr;
    const stream = fs.createReadStream('./files/data.csv', { encoding: 'utf8' });
    stream.on('data', data => {
      arr = data.split(/\n/);
      stream.destroy();
    });
    stream.on('close', () => {
      arr.forEach((row, i) => {
        let temp = row.split(',');
        if (i === 0) {
          temp.forEach((data, i) => {
            if (i > 1) {
              devices.push({
                device_id: i - 1,
                device_name: data.replace('\r', '')
              })
            }
          });
        } else {
          temp.forEach((data, i) => {
            if (i > 1) {
              let device = new Device((i - 1), null);
              rate.push({
                device: device,
                year: parseInt(temp[0]),
                rate: isNaN(parseFloat(data)) ? null : parseFloat(data),
              })
            }
          });
        }
      });

      // clear
      this.utilizationRepository.clear().then(res => {
        this.deviceRepository.delete({}).then(res => {
          // save
          this.deviceRepository.save(devices).then(res => {
            this.utilizationRepository.save(rate);
          });
        });
      });
    });

    return null;
  }
}