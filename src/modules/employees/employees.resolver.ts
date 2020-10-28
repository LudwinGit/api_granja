import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { EmployeesService } from './employees.service';
import { createEmployeeInput } from './input/create-employee.input';
import { Employee } from './entities/employees.entity';
// import { Seller } from '../sellers/entities/seller.entity';
// import { SellersService } from '../sellers/sellers.service';

@Resolver(()=>Employee)
export class EmployeesResolver {
    constructor(
        private readonly employeeService: EmployeesService,
        // private readonly sellerService: SellersService
    ) { }

    @Query(()=>[Employee])
    async employees() {
        return this.employeeService.findAll();
    }

    @Query(()=>[Employee])
    async employeesWithoutSeller(){
        return this.employeeService.withoutSeller();
    }

    @Query(()=>[Employee])
    async employeesWithoutUser(){
        return this.employeeService.withoutUser();
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

    @Mutation(()=>Employee,{nullable:true})
    async removeEmployee(@Args('id') id: number){
        return this.employeeService.delete(id);
    }

    // @ResolveField(()=>Seller)
    // async seller(@Parent() employee:Employee)
    // {
    //     return this.sellerService.find(employee.seller.id)
    // }
}
