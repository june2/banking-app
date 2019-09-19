import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength, IsEmail } from 'class-validator';
import { refreshTokenList } from './jwt.list';

export class AuthLoginDto {
  @ApiModelProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  public password: string;
}

export class JwtDto {

  constructor(expiresIn: number, accessToken: string, refreshToken: string) {
    this.expiresIn = expiresIn;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  readonly expiresIn: number;
  readonly accessToken: string;
  public refreshToken: string;
}
