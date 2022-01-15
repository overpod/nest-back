import {
  IsNotEmpty,
  MaxLength,
  Length,
  IsString,
  IsEmail,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthInput {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(100)
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 100)
  @IsString()
  password: string;
}
