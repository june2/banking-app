import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnection } from 'typeorm';
import { join } from 'path';
import { ConfigService } from '../../common/config/config.service';
import { UserModule } from './user.module';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto'

describe('UserService', () => {
  let service: UserService;
  const config: ConfigService = new ConfigService();

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: config.dbType,
          host: config.dbHost,
          port: config.dbPort,
          username: config.dbUser,
          password: config.dbPwd,
          database: config.dbName,
          entities: [join(__dirname, '**/**.entity{.ts,.js}')],
          synchronize: true
        }),
        TypeOrmModule.forFeature([User]),
        UserModule,
      ]
    })
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    let createUserDto = new CreateUserDto();
    createUserDto.email = 'test@test.com';
    createUserDto.password = '12345';
    createUserDto.name = 'test';
    let user = await service.create(createUserDto);
    expect(user).toBeDefined();
  });

  it('find all', async () => {
    let users = await service.findAll();
    expect(users).toHaveLength(1);
  });

  afterAll(async () => {    
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(User)
      // .where("id = :id", { id: 1 })
      .execute();
  });
});
