import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { EmployeeType } from './models/employees.model';
import { createEmployeeInput } from './dto/create-employee.input';
import { WarehousesService } from '../warehouses/warehouses.service';

@Resolver()
export class EmployeesResolver {
    constructor(
        private readonly employeeService: EmployeesService,
        private readonly warehouseService: WarehousesService
    ) { }

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

    @Mutation(()=>EmployeeType,{name :"employees_addWarehouse"})
    async addWarehouse(@Args('idEmployee') idEmployee:String,@Args('idWarehouse') idWarehouse:String){
        const warehouse = await this.warehouseService.findOneById(idWarehouse)
        return this.employeeService.addWarehouse(idEmployee,warehouse);
    }
}
