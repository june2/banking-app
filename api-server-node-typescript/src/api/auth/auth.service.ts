import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { identifier } from '@babel/types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) { }

  async createToken(user: User) {
    return {
      expiresIn: 3600,
      accessToken: this.jwtService.sign(Object.assign({}, user))
    };
  }

  async validateUser(payload: JwtPayload): Promise<User> {
    // put some validation logic here
    // for example query user by id/email/username
    return await this.userService.findById(payload.id);
  }
}
