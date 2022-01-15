import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AuthOutputUser {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  @ApiProperty()
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  email: string;
}

export class AuthOutput {
  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiProperty()
  user: AuthOutputUser;
}
