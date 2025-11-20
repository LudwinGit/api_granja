import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { WarehouseCategoriesService } from '../warehousecategories/warehousecategories.service';
import { Warehouse } from './entitys/warehouse.entity';
import { WarehouseInput } from './input/warehouse.input';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';
import { WarehouseProductInput } from './input/warehouse_product.input';
import { WarehouseProduct } from './entitys/warehouseProduct.entity';
import { ProductsService } from '../products/products.service';
import { WarehouseproductService } from '../warehouseproduct/warehouseproduct.service';
import { PaginatedWarehouseProduct } from '../common/shared/Paginated';

@Resolver(() => Warehouse)
export class WarehousesResolver {
    constructor(
        private readonly warehouseService: WarehousesService,
        private readonly warehouseCategoryService: WarehouseCategoriesService,
        private readonly warehouseProductService: WarehouseproductService,
        private readonly productService: ProductsService
    ) { }

    @Query(() => [Warehouse], { nullable: true })
    async warehouses() : Promise<Warehouse[]> {
        return this.warehouseService.findAll();
    }

    @ResolveField(() => WarehouseCategory)
    async warehouseCategory(@Parent() warehouse: Warehouse): Promise<WarehouseCategory> {
        const { category_name } = warehouse;
        return this.warehouseCategoryService.find(category_name);
    }

    @Query(() => [Warehouse], { nullable: true })
    async warehousesWithoutAddingtoSeller(@Args('sellerId') sellerId: number) : Promise<Warehouse[]> {
        return this.warehouseService.warehousesWithoutAddingtoSeller(sellerId)
    }

    @ResolveField(() => [WarehouseProduct])
    async warehouseProducts(@Parent() warehouse: Warehouse) : Promise<WarehouseProduct[]> {
        const { id } = warehouse
        return this.warehouseProductService.findByWarehouse(id)
    }

    @Query(() => Warehouse, { nullable: true })
    async warehouse(@Args('id') id: number) : Promise<Warehouse> {
        return this.warehouseService.find(id);
    }

    @Mutation(() => Warehouse)
    async createWarehouse(@Args('data') input: WarehouseInput) : Promise<Warehouse> {
        return this.warehouseService.create(input);
    }

    @Mutation(() => Warehouse)
    async updateWarehouse(@Args('id') id: number, @Args('data') input: WarehouseInput) : Promise<Warehouse> {
        return this.warehouseService.update(id, input);
    }

    @Mutation(() => Warehouse, { nullable: true })
    async removeWarehouse(@Args('id') id: number) : Promise<Warehouse> {
        return this.warehouseService.delete(id);
    }

    @Mutation(() => Warehouse)
    async addProductToWarehouse(@Args('data') input: WarehouseProductInput) : Promise<Warehouse> {
        return this.warehouseService.addProductToWarehouse(input)
    }

    @Mutation(() => Warehouse)
    async removeProductToWarehouse(@Args('data') input: WarehouseProductInput) : Promise<Warehouse> {
        return this.warehouseService.removeProductToWarehouse(input)
    }

    @Query(() => PaginatedWarehouseProduct)
    async minStockByWarehouse(
        @Args('warehouseId', { type: () => Int }) warehouseId: number,
        @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
        @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
    ): Promise<PaginatedWarehouseProduct> {
        return this.warehouseProductService.minStockByWarehouse(warehouseId, page, pageSize);
    }
}
