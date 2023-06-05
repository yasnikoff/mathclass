import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ConfigModule } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username, pass) {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!(await bcrypt.compare(pass, user?.hash))) {
      throw new UnauthorizedException();
    }
    await ConfigModule.envVariablesLoaded;
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_TIME,
      }),
      user: {
        username: user.username,
        id: user.id,
      },
    };
  }
}
