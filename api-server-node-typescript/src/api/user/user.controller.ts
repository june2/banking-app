import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Param, Body, Get, Post, Put, Req, UseGuards, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateResult } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, ResponseUserDto } from './user.dto';

@ApiBearerAuth()
@ApiUseTags('User')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    // private readonly authService: AuthService
  ) { }

  @Get()
  @ApiOperation({ title: 'Get user' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: 'Get user' })
  findById(@Req() request): Promise<User> {
    // if (!id) throw new HttpException('ID parameter is missing', HttpStatus.BAD_REQUEST);    
    return request.user;
  }

  @Put('/:id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userService.update(id, updateUserDto);
  }

  // @Post()
  // @ApiOperation({ title: 'Create user' })
  // @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
  //   return this.userService.create(createUserDto).then(user => {
  //     // return this.authService.createToken(user).then(jwt => {
  //       return new ResponseUserDto(user, null);
  //     // });
  //   }).catch(res => {
  //     throw new BadRequestException('Duplicated email')
  //   });
  // }
}
