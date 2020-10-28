import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { SaleproductService } from './saleproduct.service';
import { SaleProductInput } from './input/saleproduct.input';
import { SaleProduct } from './saleproduct.entity';

@Resolver()
export class SaleproductResolver {
    constructor(
        private readonly saleProductService: SaleproductService
    ) { }

    @Query(() => [SaleProduct])
    async productsSale(@Args('saleId') saleId: number): Promise<SaleProduct[]> {
        return this.saleProductService.findBySale(saleId)
    }

    @Mutation(() => SaleProduct)
    async addProductToSale(@Args('data') input: SaleProductInput): Promise<SaleProduct> {
        return this.saleProductService.create(input)
    }

    @Mutation(() => Boolean)
    async removeProducttoSale(@Args('saleId') saleId: number, @Args('productId') productId: number, @Args('measureId') measureId: number) {
        return this.saleProductService.remove(saleId,productId,measureId)
    }

}
