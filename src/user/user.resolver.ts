import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';
import { LoginDto, LoginOutput } from './dto/login.dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => User)
  async findUser(@Args('search', { type: () => String }) search: string) {
    return await this.userService.findUser({ search });
  }

  @Mutation(() => LoginOutput)
  async login(@Args('inputs', { type: () => LoginDto }) inputs: LoginDto) {
    const { email, password } = inputs;
    return await this.userService.login({ email, password });
  }

  @Mutation(() => User)
  async createUser(
    @Args('user', { type: () => CreateUserDto }) user: CreateUserDto,
  ) {
    return await this.userService.create({ user });
  }
}
