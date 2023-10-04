import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@ObjectType()
export class Core {
  @Field(() => ID, { description: 'Primary Key' })
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date, { description: '생성일' })
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date, { description: '마지막 업데이트일' })
  @UpdateDateColumn()
  updatedAt: Date;

  @Field(() => Date, { description: '삭제일' })
  @DeleteDateColumn()
  deletedAr: Date;
}
