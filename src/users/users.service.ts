import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { SignUpInput } from '../auth/dto/SignUpInput';
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

  async create(input: SignUpInput) {
    const user = await this.getByEmail(input.email);
    if (user)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    return this.usersRepository.save(input);
  }
}
