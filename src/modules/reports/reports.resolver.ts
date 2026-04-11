import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { ProductKardex } from './type/productKardex';
import { StockWarehouse } from './type/stockWarehouse';
import { ProductNetSold } from './type/productNetSold';
import { PaginatedProductNetSold } from './type/PaginatedProductNetSold';

@Resolver(() => ProductKardex)
export class ReportsResolver {
    constructor(
        private readonly reportService: ReportsService
    ) { }

    @Query(() => [ProductKardex], { nullable: true })
    async kardex(@Args('date') date: Date, @Args('warehouseId') warehouseId: number, @Args('sku') sku: string): Promise<ProductKardex[]> {
        return this.reportService.kardex(date, warehouseId, sku);
    }

    @Query(() => [StockWarehouse], { nullable: true })
    async stockWarehouse(@Args('warehouseId') warehouseId: number): Promise<StockWarehouse[]> {
        return this.reportService.stockWarehouse(warehouseId);
    }

    @Query(() => PaginatedProductNetSold, { nullable: true })
    async productsNetSold(
        @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
        @Args('pageSize', { type: () => Int, defaultValue: 100 }) pageSize: number,
    ): Promise<PaginatedProductNetSold> {
        return this.reportService.productsNetSold(page, pageSize);
    }

}
