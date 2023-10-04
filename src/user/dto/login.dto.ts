import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Column } from 'typeorm';

@InputType()
export class LoginDto extends PickType(User, ['email', 'password'] as const) {
  @Field(() => String, { description: '카카오 이메일' })
  @Column()
  email: string;

  @Field(() => String, { description: '비밀번호' })
  @Column()
  password: string;
}
