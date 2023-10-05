import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { IsEmail, IsString } from 'class-validator';

@InputType()
export class CreateUserDto extends PickType(User, [
  'kakaoId',
  'email',
  'phone',
  'password',
  'name',
] as const) {
  @Field(() => String, { description: '카카오 ID' })
  @IsString()
  kakaoId: string;

  @Field(() => String, { description: '카카오 이메일' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: '핸드폰 번호' })
  @IsString()
  phone: string;

  @Field(() => String, { description: '비밀번호' })
  @IsString()
  password: string;

  @Field(() => String, { description: '이름' })
  @IsString()
  name: string;
}
