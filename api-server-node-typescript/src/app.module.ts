import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UserModule } from './api/user/user.module';
import { DeviceModule } from './api/device/device.module';
import { UtilizationModule } from './api/utilization/utilization.module';
import { AuthModule } from './api/auth/auth.module';
import { ConfigModule } from './common/config/config.module';
import { ConfigService } from './common/config/config.service';
import { BankingModule } from './common/banking/banking.module';

const config: ConfigService = new ConfigService();

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      type: config.dbType,
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUser,
      password: config.dbPwd,
      database: config.dbName,
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
      logging: config.dbLog
    }),
    AuthModule,
    UserModule,
    DeviceModule,
    UtilizationModule,
    // BankingModule
  ],
})
export class ApplicationModule { }
