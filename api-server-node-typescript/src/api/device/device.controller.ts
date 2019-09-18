import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Param, Body, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { DeviceService } from './device.service';
import { ResponseDevicesDto } from './device.dto';

@ApiBearerAuth()
@ApiUseTags('Device')
@Controller('devices')
export class DeviceController {
  constructor(private readonly DeviceService: DeviceService) { }

  @Get()
  @ApiOperation({ title: 'Get Device' })
  async findAll(): Promise<ResponseDevicesDto> {
    return new ResponseDevicesDto(await this.DeviceService.findAll());
  }
}
