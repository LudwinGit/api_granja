import { Resolver, Query, Mutation, Args, ResolveField, Parent, ResolveProperty } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { WarehouseCategoriesService } from '../warehousecategories/warehousecategories.service';
import { Warehouse } from './warehouse.entity';
import { WarehouseInput } from './input/warehouse.input';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';

@Resolver(() => Warehouse)
export class WarehousesResolver {
    constructor(
        private readonly warehouseService:WarehousesService,
        private readonly warehouseCategoryService:WarehouseCategoriesService
    ){}

    @Query(() => [Warehouse])
    async getWarehouses() {
        return this.warehouseService.findAll();
    }

    @ResolveField(()=>WarehouseCategory)
    async warehouseCategory(@Parent() warehouse: Warehouse){
        const {categoryName} = warehouse;
        return this.warehouseCategoryService.find(categoryName);
    }

    // @Query(returns => WarehouseType)
    // async getWarehouse(@Args('id') id:string){
    //     return this.warehouseService.findOneById(id);
    // }

    @Mutation(() => Warehouse)
    async createWarehouse(@Args('data') input: WarehouseInput) {
        return this.warehouseService.create(input);
    }

    // @Mutation(()=>WarehouseType)
    // async updateWarehouse(@Args('id') id: string, @Args('input') input:createWarehouseInput){
    //     return this.warehouseService.update(id,input);
    // }
    
    // @Mutation(() => WarehouseType)
    // async removeWarehouse(@Args('id') id: string){
    //     return this.warehouseService.delete(id);
    // }
    // @ResolveProperty()
    // async 
}
