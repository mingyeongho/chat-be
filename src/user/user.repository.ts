import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser({ user }: { user: CreateUserDto }) {
    const newUser = this.create({
      ...user,
      nickname: user.name,
    });
    return this.save(newUser);
  }
}
