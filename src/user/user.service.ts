import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { UserRepository } from './user.repository';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async findUser({ search }: { search: string }) {
    return await this.userRepository.findOne({ where: { name: search } });
  }

  async login({ email, password }: LoginDto) {
    return await this.userRepository.login({ email, password });
  }

  async create({ ...props }: CreateUserDto) {
    return this.userRepository.createUser({ ...props });
  }

  async verifyToken({ token }: { token: string }) {
    return this.jwtService.verify(token);
  }
}
