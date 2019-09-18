import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Param, Body, Get, Post, UseGuards, NotFoundException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UtilizationService } from './utilization.service';
import { Utilization } from './utilization.entity';
import { ResponseUtilizationDto, ResponseDeviceDto, RequestUtilizationDto, UtilizationDto } from './utilization.dto';
import { Device } from './../device/device.entity';

@ApiBearerAuth()
@ApiUseTags('Utilization')
@Controller('utilizations')
export class DeviceController {
  constructor(private readonly utilizationService: UtilizationService) { }

  @Get()
  @ApiOperation({ title: 'Get utilizations' })
  findAll(): Promise<Utilization[]> {
    return this.utilizationService.findAll();
  }

  @Get('/getHighestDevice')
  @ApiOperation({ title: 'Get Highest Device By Each Year' })
  async findHighestDeviceByEachYear(): Promise<ResponseDeviceDto> {
    return new ResponseDeviceDto(await this.utilizationService.findHighestDeviceByEachYear());
  }

  @Get('/getHighestDevice/:year')
  @ApiOperation({ title: 'Get Highest Device By Year' })
  findHighestDeviceByYear(@Param('year') year: number): Promise<ResponseUtilizationDto> {
    return this.utilizationService.findHighestDeviceByYear(year).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${year} year is not exist`);
    });
  }

  @Get('/getHighestRate/:deviceId')
  @ApiOperation({ title: 'Get Highest Rate By deviceId' })
  findHighestRateByYear(@Param('deviceId') deviceId: number): Promise<ResponseUtilizationDto> {
    return this.utilizationService.findHighestRateByDeviceId(new Device(deviceId, null)).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${deviceId} deviceId is not exist`);
    });
  }

  @Post('/predictRate')
  @ApiOperation({ title: 'Predict Rate By DeviceId' })
  predictRateByDeviceId(@Body() requestUtilizationDto: RequestUtilizationDto): Promise<ResponseUtilizationDto> {
    return this.utilizationService.predictRateByDeviceId(new Device(requestUtilizationDto.device_id, null)).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${requestUtilizationDto.device_id} deviceId is not exist`);
    });
  }
}
