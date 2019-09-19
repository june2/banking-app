import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { join } from 'path';
import { ConfigService } from '../../src/common/config/config.service';
import { UserModule } from '../../src/api/user/user.module';
import { User } from '../../src/api/user/user.entity';
import { UserService } from '../../src/api/user/user.service';
import { UserRepository } from '../../src/api/user/user.repository';
import { DeviceModule } from '../../src/api/device/device.module';
import { Device } from '../../src/api/device/device.entity';
import { DeviceService } from '../../src/api/device/device.service';
import { AuthModule } from '../../src/api/auth/auth.module';
import { AuthService } from '../../src/api/auth/auth.service';

describe('Devices', () => {

  let app: INestApplication;
  const config: ConfigService = new ConfigService();

  let device: Device;
  let token: string;

  beforeAll(async () => {

    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: config.dbType,
          host: config.dbHost,
          port: config.dbPort,
          username: config.dbUser,
          password: config.dbPwd,
          database: config.dbName,
          entities: [join(process.env.PWD, 'src/**/**.entity{.ts,.js}')],
          synchronize: true
        }),
        TypeOrmModule.forFeature([Device]),
        DeviceModule,
        UserModule,
        AuthModule
      ]
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // const userRepository: UserRepository = app.get(UserRepository);
    // userRepository.create({ email: 'test@test.com', password: '1234' });
  });

  it(`GET /devices 200`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/devices')
      .set('Authorization', `Bearer ${token}`);
    expect(status).toBe(200);
  });
});
