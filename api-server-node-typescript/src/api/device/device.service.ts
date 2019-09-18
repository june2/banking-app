import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Device } from './device.entity';
import { DeviceRepository } from './device.repository';


@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: DeviceRepository,
  ) { }

  async findAll(): Promise<Device[]> {    
    return await this.deviceRepository.find();
  }
}
