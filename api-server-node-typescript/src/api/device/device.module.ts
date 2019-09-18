import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { DeviceRepository } from './device.repository';
import { Device } from './device.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceRepository])],
  providers: [DeviceService],
  controllers: [DeviceController],
  exports: [DeviceService]
})
export class DeviceModule { }
