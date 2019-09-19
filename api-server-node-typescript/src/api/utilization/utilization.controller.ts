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
export class UtilizationController {
  constructor(private readonly utilizationService: UtilizationService) { }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get utilizations' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(): Promise<Utilization[]> {
    return this.utilizationService.findAll();
  }

  @Get('/getHighestDevice')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Highest Device By Each Year' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findHighestDeviceByEachYear(): Promise<ResponseDeviceDto> {
    return new ResponseDeviceDto(await this.utilizationService.findHighestDeviceByEachYear());
  }

  @Get('/getHighestDevice/:year')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Highest Device By Year' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findHighestDeviceByYear(@Param('year') year: number): Promise<ResponseUtilizationDto> {
    return this.utilizationService.findHighestDeviceByYear(year).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${year} year is not exist`);
    });
  }

  @Get('/getHighestRate/:deviceId')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get Highest Rate By deviceId' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findHighestRateByYear(@Param('deviceId') deviceId: number): Promise<ResponseUtilizationDto> {
    return this.utilizationService.findHighestRateByDeviceId(new Device(deviceId, null)).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${deviceId} deviceId is not exist`);
    });
  }

  @Post('/predictRate')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Predict Rate By DeviceId' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  predictRateByDeviceId(@Body() requestUtilizationDto: RequestUtilizationDto): Promise<ResponseUtilizationDto> {
    return this.utilizationService.predictRateByDeviceId(new Device(requestUtilizationDto.device_id, null)).then(res => {
      return new ResponseUtilizationDto(new UtilizationDto(res.year, res.rate, res.device.device_name));
    }).catch(err => {
      throw new NotFoundException(`${requestUtilizationDto.device_id} deviceId is not exist`);
    });
  }
}
