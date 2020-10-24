import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UserInput } from './input/user.input';
import { Employee } from '../employees/entities/employees.entity';
import { EmployeesService } from '../employees/employees.service';

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

    @Mutation(() => User)
    async updateUser(@Args('id') id: number, @Args('data') input: UserInput) {
        return this.userService.update(id, input)
    }

    @Mutation(() => User, { nullable: true })
    async removeUser(@Args('id') id: number) {
        return this.userService.remove(id)
    }

    @Mutation(() => User)
    async deactivateUser(@Args('id') id: number) {
        return this.userService.deactivate(id)
    }
}
