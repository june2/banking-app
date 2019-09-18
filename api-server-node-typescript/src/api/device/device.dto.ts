import { ApiModelProperty } from '@nestjs/swagger';
import { Device } from './device.entity';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class CreateDeviceDto {
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

export class ResponseDevicesDto {
  constructor(devices: Device[]) {
    this.devices = devices;
  }
  @ApiModelProperty()
  devices: Device[];
}

