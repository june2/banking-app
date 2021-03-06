import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { join } from 'path';
import { ConfigService } from '../../src/common/config/config.service';
import { UserModule } from '../../src/api/user/user.module';
import { User } from '../../src/api/user/user.entity';
import { ResponseUserDto } from '../../src/api/user/user.dto';
import { DeviceModule } from '../../src/api/device/device.module';
import { Device } from '../../src/api/device/device.entity';
import { DeviceService } from '../../src/api/device/device.service';
import { AuthModule } from '../../src/api/auth/auth.module';
import { AuthService } from '../../src/api/auth/auth.service';

describe('Devices', () => {

  let app: INestApplication;
  const config: ConfigService = new ConfigService();

  let device: Device;
  let user: ResponseUserDto;

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
    let { body } = await request(app.getHttpServer())
      .post('/auth/signUp')
      .send({ email: 'test@test.com', password: '12345', name: 'test' });
    user = body;
  });

  it(`GET /devices 200 (인터넷뱅킹 서비스 접속 기기 목록을 출력)`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/devices')
      .set('Authorization', `Bearer ${user.jwt.accessToken}`);
    expect(status).toBe(200);
  });

  afterAll(async () => {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      .execute();
    await app.close();
  });
});
