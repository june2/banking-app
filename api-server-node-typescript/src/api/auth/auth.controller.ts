import * as crypto from 'crypto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import { Controller, Get, Post, UseGuards, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { AuthLoginDto } from './auth.dto';

@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() authLoginDto: AuthLoginDto) : Promise<any> {        
    const user = await this.userService.findByEmailAndPass(
      authLoginDto.email, 
      crypto.createHmac('sha256', authLoginDto.password).digest('hex')
    );
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }    
    return await this.authService.createToken(user);        
  }
}
