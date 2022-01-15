import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthInput } from '../auth/dto/AuthInput';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getByEmail(email: string) {
    return await this.usersRepository.findOne({ email });
  }

  async create(input: AuthInput) {
    const user = await this.getByEmail(input.email);
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    return this.usersRepository.save(input);
  }

  async validateUser(payload: AuthInput): Promise<User> {
    const user = await this.getByEmail(payload.email);
    if (!user || !bcrypt.compareSync(payload.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
