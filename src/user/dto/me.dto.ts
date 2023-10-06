import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MeOutput {
  @Field(() => String, { description: '본인의 이메일' })
  email: string;

  @Field(() => String, { description: '본인의 카카오 아이디' })
  kakaoId: string;

  @Field(() => String, { description: '본인의 이름' })
  name: string;
}
