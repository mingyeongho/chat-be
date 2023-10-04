import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser({ search }: { search: string }) {
    return await this.userRepository.findOne({ where: { name: search } });
  }

  async login({ email, password }: LoginDto) {
    return await this.userRepository.login({ email, password });
  }

  async create({ user }: { user: CreateUserDto }) {
    return this.userRepository.createUser({ user });
  }
}
