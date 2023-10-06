import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { LoginDto, LoginOutput } from './dto/login.dto';
import { LoginValidPipe } from './pipes/login.pipe';
import { SignUpValidPipe } from './pipes/signup.pipe';
import { MeOutput } from './dto/me.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guard/auth.guard';
import { AuthUser } from './decorator/auth-user.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUser(@Args('search', { type: () => String }) search: string) {
    return await this.userService.findUser({ search });
  }

  @Mutation(() => LoginOutput)
  async login(
    @Args('inputs', { type: () => LoginDto }, LoginValidPipe) inputs: LoginDto,
  ) {
    return await this.userService.login({ ...inputs });
  }

  @Mutation(() => User)
  async createUser(
    @Args('user', { type: () => CreateUserDto }, SignUpValidPipe)
    user: CreateUserDto,
  ) {
    return await this.userService.create({ ...user });
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => MeOutput)
  me(@AuthUser() authUser: MeOutput) {
    return {
      ...authUser,
    };
  }
}
