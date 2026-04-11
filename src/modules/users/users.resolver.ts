import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { UpdateUserInput, UserInput } from './input/user.input';
import { Employee } from '../employees/entities/employees.entity';
import { EmployeesService } from '../employees/employees.service';
import { Permission } from '../permissions/permission.entity';
@Resolver(() => User)
export class UsersResolver {
    constructor(
        private readonly userService: UsersService,
        private readonly employeeService: EmployeesService
    ) { }

    @Query(() => [User], { nullable: true })
    async users():Promise<User[]> {
        return this.userService.findAll()
    }

    @Query(() => User, { nullable: true })
    async user(@Args('id') id: number):Promise<User> {
        return this.userService.find(id)
    }

    @Mutation(() => User)
    async createUser(@Args('data') input: UserInput):Promise<User> {
        return this.userService.create(input)
    }

    @Mutation(() => User)
    async updateUser(@Args('id') id: number, @Args('data') input: UpdateUserInput):Promise<User> {
        return this.userService.update(id, input)
    }

    @Mutation(() => User, { nullable: true })
    async removeUser(@Args('id') id: number):Promise<User> {
        return this.userService.remove(id)
    }

    @Mutation(() => User)
    async deactivateUser(@Args('id') id: number):Promise<User> {
        return this.userService.deactivate(id)
    }

    @Mutation(() => Permission)
    async addPermissionToUser(@Args('userId') userId: number, @Args('permissionId') permissionId: number): Promise<Permission> {
        return this.userService.addPermission(userId, permissionId)
    }

    @Mutation(() => Permission,{nullable:true})
    async removePermissionToUser(@Args('userId') userId: number, @Args('permissionId') permissionId: number): Promise<Permission> {
        return this.userService.removePermission(userId, permissionId)
    }



    @ResolveField(() => Employee)
    async employee(@Parent() user: User):Promise<Employee> {
        const employee = await this.employeeService.find(user.employee.id)
        return employee
    }
}
