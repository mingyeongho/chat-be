import { DataSource, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.input';
import { LoginDto, LoginOutput } from './dto/login.dto';
import { hashing, isCompareHashed } from 'src/common/hash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(
    private dataSource: DataSource,
    private jwtService: JwtService,
  ) {
    super(User, dataSource.createEntityManager());
  }

  async login({ email, password }: LoginDto): Promise<LoginOutput> {
    const user = await this.findOne({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('일치하는 유저가 없습니다.');
    }

    const isEqual = await isCompareHashed({
      text: password,
      hashedPassword: user.password,
    });

    if (!isEqual) {
      throw new UnauthorizedException('일치하는 유저가 없습니다.');
    }

    const payload = { sub: user.kakaoId, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async createUser({ user }: { user: CreateUserDto }) {
    const hashedPassword = await hashing({ text: user.password });

    const newUser = this.create({
      ...user,
      password: hashedPassword,
      nickname: user.name,
    });

    return this.save(newUser);
  }
}
