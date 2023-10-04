import { ObjectType, Field } from '@nestjs/graphql';
import { Core } from 'src/common/core.entity';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity('user')
export class User extends Core {
  @Field(() => String, { description: '카카오 ID' })
  @Column()
  kakaoId: string;

  @Field(() => String, { description: '카카오 이메일' })
  @Column()
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

  @Field(() => String, { description: '상태 메시지', nullable: true })
  @Column({ nullable: true })
  message?: string;

  @Field(() => String, { description: '본인 닉네임' })
  @Column()
  nickname: string;
}
