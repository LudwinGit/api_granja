import { Resolver, Query, ResolveField, Parent, Args, Mutation } from '@nestjs/graphql';
import { SellersService } from './sellers.service';
import { EmployeesService } from '../employees/employees.service';
import { Seller } from './entities/seller.entity';
import { Employee } from '../employees/entities/employees.entity';
import { SellerInput } from './inputs/create-seller.input';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { SellerWarehouseInput } from './inputs/addwarehouse.input';
import { Route } from '../routes/entities/route.entity';

@Resolver(() => Seller)
export class SellersResolver {
    constructor(
        private readonly sellerService: SellersService,
        private readonly employeeService: EmployeesService
    ) { }

    @Query(() => [Seller], { nullable: true })
    async sellers() {
        return this.sellerService.findAll()
    }

    @Query(() => Seller, { nullable: true })
    async seller(@Args('id') id: number) {
        return this.sellerService.find(id)
    }

    @Mutation(() => Seller)
    async createSeller(@Args('data') input: SellerInput) {
        const employee = await this.employeeService.find(input.employeeId)
        return this.sellerService.create(employee, input)
    }

    @Mutation(() => Seller)
    async updateSeller(@Args('id') id: number, @Args('data') input: SellerInput) {
        const employee = await this.employeeService.find(input.employeeId)
        return this.sellerService.update(id, employee, input)
    }

    @Mutation(() => Seller, { nullable: true })
    async removeSeller(@Args('id') id: number) {
        return this.sellerService.delete(id)
    }

    @Mutation(()=>Warehouse,{nullable:true})
    async addWarehouseToSeller(@Args('data') input:SellerWarehouseInput){
        return this.sellerService.addWarehouseToSeller(input)
    }

    @Mutation(()=>Warehouse,{nullable:true})
    async removeWarehouseToSeller(@Args('data') input:SellerWarehouseInput){
        return this.sellerService.removeWarehouseToSeller(input)
    }

    @ResolveField(() => Employee, { nullable: true })
    async employee(@Parent() seller: Seller) {
        return this.employeeService.find(seller.employee.id)
    }

    @Mutation(()=>Route,{nullable:true})
    async addRouteToSeller(@Args('sellerId') sellerId:number,@Args('routeId') routeId:number){
        return this.sellerService.addRouteToSeller(sellerId,routeId)
    }

    @Mutation(()=>Route,{nullable:true})
    async removeRouteToSeller(@Args('sellerId') sellerId:number,@Args('routeId') routeId:number){
        return this.sellerService.removeRouteToSeller(sellerId,routeId)
    }

    @ResolveField(()=>[Route],{nullable:true})
    async routes(@Parent() seller:Seller){
        const {routes} = await this.sellerService.find(seller.id)
        return routes
    }

    @ResolveField(()=>[Warehouse],{nullable:true})
    async warehouses(@Parent() seller:Seller){
        const {warehouses} = await this.sellerService.find(seller.id)
        return warehouses
    }
}
