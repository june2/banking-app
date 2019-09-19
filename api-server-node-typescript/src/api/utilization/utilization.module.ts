import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilizationService } from './utilization.service';
import { UtilizationController } from './utilization.controller';
import { UtilizationRepository } from './utilization.repository';
import { Utilization } from './utilization.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Utilization, UtilizationRepository])],
  providers: [UtilizationService],
  controllers: [UtilizationController],
  exports: [UtilizationService]
})
export class UtilizationModule { }
