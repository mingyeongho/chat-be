import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsString } from 'class-validator';

@InputType()
export class LoginDto extends PickType(User, ['email', 'password'] as const) {
  @Field(() => String, { description: '카카오 이메일' })
  @IsString()
  email: string;

  @Field(() => String, { description: '비밀번호' })
  @IsString()
  password: string;
}

@ObjectType()
export class LoginOutput {
  @Field(() => String)
  access_token: string;
}
