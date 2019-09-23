import * as crypto from 'crypto';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiUseTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Controller, Get, Post, Body, Req, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { AuthLoginDto } from './auth.dto';
import { CreateUserDto, ResponseUserDto } from './../user/user.dto';
import { refreshTokenList } from './jwt.list';


@ApiBearerAuth()
@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @Post('/signUp')
  @ApiOperation({ title: 'Create user' })
  @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  create(@Body() createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    return this.userService.create(createUserDto).then(user => {
      return this.authService.createToken(user).then(jwt => {
        return new ResponseUserDto(user, jwt);
      });
    }).catch(res => {
      throw new BadRequestException('Duplicated email')
    });
  }

  @Post('/login')
  @ApiResponse({ status: 201, description: 'Successful Login' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<any> {
    const user = await this.userService.findByEmailAndPass(
      authLoginDto.email,      
      crypto.createHmac('sha256', authLoginDto.password).digest('hex')
    );
    if (!user) {
      throw new UnauthorizedException('Wrong login combination!');
    }
    return await this.authService.createToken(user);
  }

  @Get('/refresh')
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@Req() req): Promise<any> {
    const refreshToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    const index = refreshTokenList.indexOf(refreshToken);
    if (index > -1) {
      refreshTokenList.splice(index, 1);
      return await this.authService.createToken(req.user);
    } else {
      throw new UnauthorizedException();
    }
  }
}
