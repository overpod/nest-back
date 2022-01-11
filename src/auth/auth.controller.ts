import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { SignUpOutput } from './dto/SignUpOutput';
import { SignUpInput } from './dto/SignUpInput';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SignUpOutput,
  })
  async signup(@Body() input: SignUpInput): Promise<SignUpOutput> {
    const user = await this.usersService.create(input);
    return this.authService.createToken(user);
  }
}
