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
import { UtilizationModule } from '../../src/api/utilization/utilization.module';
import { Utilization } from '../../src/api/utilization/utilization.entity';
import { AuthModule } from '../../src/api/auth/auth.module';

describe('Utilization', () => {

  let app: INestApplication;
  const config: ConfigService = new ConfigService();

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
        TypeOrmModule.forFeature([Utilization]),
        UserModule,
        AuthModule,
        UtilizationModule,
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

  it(`GET /getHighestDevice 200 (각 년도별로 인터넷뱅킹을 가장 많이 이용하는 접속기기를 출력)`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/utilizations/getHighestDevice')
      .set('Authorization', `Bearer ${user.jwt.accessToken}`);
    expect(status).toBe(200);
  });

  it(`GET /getHighestDevice 200 (특정 년도를 입력받아 그 해에 인터넷뱅킹에 가장 많이 접속하는 기기)`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/utilizations/getHighestDevice/2011')
      .set('Authorization', `Bearer ${user.jwt.accessToken}`);
    expect(status).toBe(200);
  });

  it(`GET /getHighestRate 200 (디바이스 아이디를 입력받아 인터넷뱅킹에 접속 비율이 가장 많은 해를 출력)`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/utilizations/getHighestRate/1')
      .set('Authorization', `Bearer ${user.jwt.accessToken}`);
    expect(status).toBe(200);
  });

  it(`POST /predictRate 201 (인터넷뱅킹 접속 기기 ID 를 입력받아 2019 년도 인터넷뱅킹 접속 비율을 예측)`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .post('/utilizations/predictRate')
      .set('Authorization', `Bearer ${user.jwt.accessToken}`)
      .send({ device_id: 1 });
    expect(status).toBe(201);
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
