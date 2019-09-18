import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Utilization } from './utilization.entity';

export class UtilizationDto {

  constructor(year: number, rate: number, deviceName: string) {
    this.year = year;
    this.rate = rate;
    this.device_name = deviceName;
  }

  @ApiModelProperty()
  @IsNumber()
  year: number;

  @ApiModelProperty({ type: String })
  @IsString()
  device_name: string;

  @ApiModelProperty({ type: Number })
  @IsNumber()
  @IsOptional()
  rate: number;
}

export class RequestUtilizationDto {
  @ApiModelProperty()
  @IsNumber()
  device_id: number;
}

export class ResponseUtilizationDto {

  constructor(utilizationDto: UtilizationDto) {
    this.result = utilizationDto;
  }

  @ApiModelProperty()
  result: UtilizationDto;
}

export class ResponseDeviceDto {
  constructor(utilizations: Utilization[]) {
    this.devices = utilizations;
  }
  @ApiModelProperty()
  devices: Utilization[];
}
