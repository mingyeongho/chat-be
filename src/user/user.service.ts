import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async create({ user }: { user: CreateUserDto }) {
    return this.userRepository.createUser({ user });
  }
}
