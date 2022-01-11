import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ValueTransformer,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

class PasswordTransformer implements ValueTransformer {
  to(value: string) {
    return bcrypt.hashSync(value, bcrypt.genSaltSync());
  }

  from(value: string) {
    return value;
  }
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @Column({ length: 200, unique: true })
  email: string;

  @Column({
    transformer: new PasswordTransformer(),
  })
  password: string;
}
