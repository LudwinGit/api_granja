import { Resolver, Query, Mutation, Args, ResolveField, Parent, ResolveProperty } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { WarehouseCategoriesService } from '../warehousecategories/warehousecategories.service';
import { Warehouse } from './entitys/warehouse.entity';
import { WarehouseInput } from './input/warehouse.input';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';
import { WarehouseProductInput } from './input/warehouse_product.input';
import { WarehouseProduct } from './entitys/warehouseProduct.entity';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';

@Resolver(() => Warehouse)
export class WarehousesResolver {
    constructor(
        private readonly warehouseService:WarehousesService,
        private readonly warehouseCategoryService:WarehouseCategoriesService,
        private readonly productService:ProductsService
    ){}

    @Query(() => [Warehouse],{nullable:true})
    async warehouses() {
        return this.warehouseService.findAll();
    }

    @ResolveField(()=>WarehouseCategory)
    async warehouseCategory(@Parent() warehouse: Warehouse){
        const {category_name} = warehouse;
        return this.warehouseCategoryService.find(category_name);
    }

    @Query(()=>[Warehouse],{nullable:true})
    async warehousesWithoutAddingtoSeller(@Args('sellerId') sellerId:number){
        return this.warehouseService.warehousesWithoutAddingtoSeller(sellerId)
    }

    @ResolveField(()=>[WarehouseProduct])
    async warehouseProducts(@Parent() warehouse:Warehouse){
        const {warehouseProducts} = warehouse
        for(const element of warehouseProducts){
            const product:Product = await this.productService.findOne(element.productId)
            element.product = product
        }
        return warehouseProducts
    }

    @Query(() => Warehouse,{nullable:true})
    async warehouse(@Args('id') id:number){
        return this.warehouseService.find(id);
    }

    @Mutation(() => Warehouse)
    async createWarehouse(@Args('data') input: WarehouseInput) {
        return this.warehouseService.create(input);
    }

    @Mutation(()=>Warehouse)
    async updateWarehouse(@Args('id') id: number, @Args('data') input:WarehouseInput){
        return this.warehouseService.update(id,input);
    }
    
    @Mutation(() => Warehouse,{nullable:true})
    async removeWarehouse(@Args('id') id: number){
        return this.warehouseService.delete(id);
    }

    @Mutation(()=>Warehouse)
    async addProductToWarehouse(@Args('data') input:WarehouseProductInput){
        return this.warehouseService.addProductToWarehouse(input)
    }

    @Mutation(()=>Warehouse)
    async removeProductToWarehouse(@Args('data') input:WarehouseProductInput){
        return this.warehouseService.removeProductToWarehouse(input)
    }
}
