import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignUpOutput {
  @Expose()
  @ApiProperty()
  id: string;

  @Expose()
  @ApiProperty()
  createdAt: string;

  @Expose()
  @ApiProperty()
  updatedAt: string;

  @Expose()
  @ApiProperty()
  email: string;
}
