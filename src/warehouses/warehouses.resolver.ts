import { Resolver, Query, Mutation, Args, ResolveField, Parent, } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { WarehouseType } from './models/warehouse.model';
import { createWarehouseInput } from './dto/create-warehouse.input';
import { WarehouseCategoriesService } from 'src/warehousecategories/warehousecategories.service';

@Resolver(of => WarehouseType)
export class WarehousesResolver {
    constructor(
        private readonly warehouseService:WarehousesService,
        private readonly warehouseCategoryService:WarehouseCategoriesService
    ){}

    @Query(() => [WarehouseType])
    async getWarehouses() {
        return this.warehouseService.findAll();
    }

    @ResolveField()
    async warehouseCategory(@Parent() warehouse: WarehouseType){
        const {warehouseCategory} = warehouse;
        return this.warehouseCategoryService.findById(warehouseCategory);
    }

    @Query(returns => WarehouseType)
    async getWarehouse(@Args('id') id:String){
        return this.warehouseService.findOneById(id);
    }

    @Mutation(() => WarehouseType)
    async createWarehouse(@Args('input') input: createWarehouseInput) {
        return this.warehouseService.create(input);
    }

    @Mutation(()=>WarehouseType)
    async updateWarehouse(@Args('id') id: String, @Args('input') input:createWarehouseInput){
        return this.warehouseService.update(id,input);
    }
    
    @Mutation(() => WarehouseType)
    async removeWarehouse(@Args('id') id: String){
        return this.warehouseService.delete(id);
    }
}
