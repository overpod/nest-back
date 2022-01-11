import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpOutputUser {
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

export class SignUpOutput {
  @Expose()
  @ApiProperty()
  token: string;

  @Expose()
  @ApiProperty()
  user: SignUpOutputUser;
}
