import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SignUpOutput } from './dto/auth-sign-up-output.dto';
import { SignUpInput } from './dto/auth-sign-up-input.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'User Sign Up API',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SignUpOutput,
  })
  async signup(@Body() input: SignUpInput) {
    return this.authService.signUp(input);
  }

  @Post('signin')
  signin(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.create();
  }
}
