import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findUser({ search }: { search: string }) {
    return await this.userRepository.findOne({ where: { name: search } });
  }

  async create({ user }: { user: CreateUserDto }) {
    return this.userRepository.createUser({ user });
  }
}
