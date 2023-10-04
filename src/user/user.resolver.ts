import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'user' })
  findAll() {
    return this.userService.findAll();
  }

  @Mutation(() => User)
  async createUser(
    @Args('user', { type: () => CreateUserDto }) user: CreateUserDto,
  ) {
    return await this.userService.create({ user });
  }
}
