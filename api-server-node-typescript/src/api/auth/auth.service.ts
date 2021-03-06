import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { JwtDto } from './auth.dto';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { refreshTokenList } from './jwt.list'
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async createToken(user: User): Promise<JwtDto>{
    let refreshToken = randomBytes(64).toString('hex');
    refreshTokenList.push(refreshToken);
    new JwtDto(3600, this.jwtService.sign(Object.assign({}, user)), refreshToken);
    return new JwtDto(3600, this.jwtService.sign(Object.assign({}, user)), refreshToken);
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    // put some validation logic here
    // for example query user by id/email/username
    return await this.userService.findById(payload.id);
  }
}
