import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './input/user.input';

@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService,
    ) { }

    @Query(() => [User], { nullable: true })
    async users() {
        return this.userService.findAll()
    }

    @Query(() => User, { nullable: true })
    async user(@Args('id') id: number) {
        return this.userService.find(id)
    }

    @Mutation(() => User)
    async createUser(@Args('data') input: UserInput) {
        return this.userService.create(input)
    }

}
