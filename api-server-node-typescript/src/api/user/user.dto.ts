import { ApiModelProperty } from '@nestjs/swagger';
import { IsInt, IsString, IsBoolean, IsOptional, IsEmail } from 'class-validator';
import { User } from './user.entity';
import { JwtDto } from './../auth/auth.dto';

export class CreateUserDto {
  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty({ type: String })
  @IsString()
  password: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;
}

export class UpdateUserDto {
  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly name: string;
}

export class ResponseUserDto {
  constructor(user: User, jwt: JwtDto) {
    this.id = user.id;
    this.email = user.email;
    this.name = user.name;
    this.jwt = jwt;
  }

  @ApiModelProperty()
  @IsEmail()
  id: number;

  @ApiModelProperty()
  @IsEmail()
  email: string;

  @ApiModelProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  jwt: JwtDto;
}