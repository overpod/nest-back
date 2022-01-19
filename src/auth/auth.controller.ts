import {
  Controller,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  Get,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { AuthOutput, AuthOutputUser } from './dto/AuthOutput';
import { AuthInput } from './dto/AuthInput';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
    type: AuthOutput,
  })
  async signup(@Body() input: AuthInput): Promise<AuthOutput> {
    const user = await this.usersService.create(input);
    return this.authService.createToken(user);
  }

  @Post('signin')
  @ApiOperation({})
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthOutput,
  })
  async signin(@Body() input: AuthInput): Promise<AuthOutput> {
    const user = await this.usersService.validateUser(input);
    return this.authService.createToken(user);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({
    status: HttpStatus.OK,
    type: AuthOutputUser,
  })
  me(@Req() req: { user: AuthOutputUser }): AuthOutputUser {
    return req.user;
  }
}
