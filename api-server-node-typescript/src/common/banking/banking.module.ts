import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankingService } from './banking.service';
import { Device } from './../../api/device/device.entity';
import { DeviceRepository } from './../../api/device/device.repository';
import { Utilization } from './../../api/utilization/utilization.entity';
import { UtilizationRepository } from './../../api/utilization/utilization.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Device, DeviceRepository, Utilization, UtilizationRepository])],
  providers: [BankingService],
  exports: [BankingService],
})
export class BankingModule { }