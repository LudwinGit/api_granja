import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { createEmployeeInput } from './input/create-employee.input';
import { Employee } from './entities/employees.entity';

@Resolver()
export class EmployeesResolver {
    constructor(
        private readonly employeeService: EmployeesService,
    ) { }

    @Query(()=>[Employee])
    async employees() {
        return this.employeeService.findAll();
    }

    @Query(()=>Employee)
    async employee(@Args('id') id:number){
        return this.employeeService.find(id);
    }

    @Mutation(()=>Employee)
    async createEmployee(@Args('data') input:createEmployeeInput){
        return this.employeeService.create(input)
    }

    @Mutation(()=>Employee)
    async updateEmployee(@Args('id') id:number, @Args('data') input:createEmployeeInput){
        return this.employeeService.update(id,input)
    }

    @Mutation(()=>Employee)
    async removeWarehouse(@Args('id') id: number){
        return this.employeeService.delete(id);
    }
}
