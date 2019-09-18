import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilizationService } from './utilization.service';
import { DeviceController } from './utilization.controller';
import { UtilizationRepository } from './utilization.repository';
import { Utilization } from './utilization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilization, UtilizationRepository])],
  providers: [UtilizationService],
  controllers: [DeviceController],
  exports: [UtilizationService]
})
export class UtilizationModule { }
