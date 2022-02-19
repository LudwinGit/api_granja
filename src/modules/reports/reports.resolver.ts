import { Resolver,Query, Args } from '@nestjs/graphql';
import { ReportsService } from './reports.service';
import { ProductKardex } from './type/productKardex';

@Resolver(()=>ProductKardex)
export class ReportsResolver {
    constructor(
        private readonly reportService: ReportsService
    ){}

    @Query(() => [ProductKardex],{nullable:true})
    async kardex(@Args('date') date: Date, @Args('warehouseId') warehouseId: number, @Args('sku') sku: string): Promise<ProductKardex[]> {
        return this.reportService.kardex(date,warehouseId,sku);
    }

}
