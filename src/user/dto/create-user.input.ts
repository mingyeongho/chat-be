import { Field, InputType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { Column } from 'typeorm';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserDto extends PickType(User, [
  'kakaoId',
  'email',
  'phone',
  'password',
  'name',
] as const) {
  @Field(() => String, { description: '카카오 ID' })
  @Column()
  kakaoId: string;

  @Field(() => String, { description: '카카오 이메일' })
  @Column()
  @IsEmail()
  email: string;

  @Field(() => String, { description: '핸드폰 번호' })
  @Column()
  phone: string;

  @Field(() => String, { description: '비밀번호' })
  @Column()
  password: string;

  @Field(() => String, { description: '이름' })
  @Column()
  name: string;
}
