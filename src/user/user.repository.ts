import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async login({ email, password }: LoginDto) {
    const user = await this.findOne({ where: { email, password } });

    if (!user) {
      throw new HttpException('일치하는 유저가 없습니다', 401);
    }

    return user;
  }

  async createUser({ user }: { user: CreateUserDto }) {
    const newUser = this.create({
      ...user,
      nickname: user.name,
    });
    return this.save(newUser);
  }
}
