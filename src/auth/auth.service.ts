import { Injectable } from '@nestjs/common';

import { UsersService } from '../users/users.service';
import { SignUpOutput } from './dto/auth-sign-up-output.dto';
import { SignUpInput } from './dto/auth-sign-up-input.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  create() {
    return 'This action adds a new auth';
  }
  async signUp(input: SignUpInput): Promise<SignUpOutput> {
    const registeredUser = await this.usersService.create(input);
    return {
      id: '',
      createdAt: '',
      updatedAt: '',
      email: input.email,
    };
  }
}
