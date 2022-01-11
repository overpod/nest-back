import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async createToken(user: User) {
    return {
      token: this.jwtService.sign({
        id: user.id,
        jwtExpirationTime: this.configService.get('jwtExpirationTime'),
      }),
      user: {
        id: user.id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: user.email,
      },
    };
  }
}
