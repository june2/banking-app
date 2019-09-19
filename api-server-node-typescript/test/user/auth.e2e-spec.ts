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
import { AuthModule } from '../../src/api/auth/auth.module';
import { AuthService } from '../../src/api/auth/auth.service';

describe('Users', () => {

  let app: INestApplication;
  const config: ConfigService = new ConfigService();

  let user: User;
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
        TypeOrmModule.forFeature([User]),
        UserModule,
        AuthModule
      ]
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`POST /users 201`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .post('/users')
      .send({ email: 'test100@test.com', password: '12345', name: 'test' });
    expect(status).toBe(201);
    expect(body.id).toBeDefined();
  });

  it(`POST /auth/login 201`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test100@test.com', password: '12345' });
    expect(status).toBe(201);
    expect(body.expiresIn).toBeDefined();
    expect(body.accessToken).toBeDefined();
    token = body.accessToken;
  });

  it(`POST /auth/login 401`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'test1@test.com', password: '12345' });
    expect(status).toBe(401);
  });

  it(`GET /users/me 200`, async () => {
    let { status, body } = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`);
    // expect(status).toBe(401);
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
