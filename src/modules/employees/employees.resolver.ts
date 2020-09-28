import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { EmployeeType } from './models/employees.model';
import { createEmployeeInput } from './dto/create-employee.input';

@Resolver()
export class EmployeesResolver {
    constructor(private readonly employeeService: EmployeesService) { }

    @Query(()=>[EmployeeType],{name:"employees"})
    async getEmployees() {
        return this.employeeService.findAll();
    }

    @Query(()=>EmployeeType,{name:"employe"})
    async getEmployee(@Args('id') id:String){
        return this.employeeService.findOneById(id);
    }

    @Mutation(()=>EmployeeType)
    async createEmployee(@Args('input') input:createEmployeeInput){
        return this.employeeService.create(input)
    }

    @Mutation(()=>EmployeeType)
    async updateEmployee(@Args('id') id:String, @Args('input') input:createEmployeeInput){
        return this.employeeService.update(id,input)
    }

    @Mutation(()=>EmployeeType)
    async removeWarehouse(@Args('id') id: String){
        return this.employeeService.delete(id);
    }
}
