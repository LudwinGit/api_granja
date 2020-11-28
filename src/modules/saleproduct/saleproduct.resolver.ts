import { Resolver, Mutation, Query, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SaleproductService } from './saleproduct.service';
import { SaleProductInput } from './input/saleproduct.input';
import { SaleProduct } from './saleproduct.entity';
import { Measure } from '../measures/measure.entity';
import { MeasuresService } from '../measures/measures.service';
import { Product } from '../products/product.entity';
import { ProductsService } from '../products/products.service';
import { ProductSale } from '../reports/type/productSale';

@Resolver(() => SaleProduct)
export class SaleproductResolver {
    constructor(
        private readonly saleProductService: SaleproductService,
        private readonly measureService: MeasuresService,
        private readonly productService: ProductsService
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
    async removeProducttoSale(@Args('saleId') saleId: number, @Args('productId') productId: number, @Args('measureId') measureId: number): Promise<boolean> {
        return this.saleProductService.remove(saleId, productId, measureId)
    }

    @ResolveField(() => Measure)
    async measure(@Parent() saleproduct: SaleProduct): Promise<Measure> {
        return await this.measureService.find(saleproduct.measureId)
    }

    @ResolveField(() => Product)
    async product(@Parent() saleproduct: SaleProduct): Promise<Product> {
        return await this.productService.findOne(saleproduct.productId)
    }


    @Query(() => [ProductSale],{nullable:true})
    async reportSaleProductByDates(@Args('date_a') date_a: Date,@Args('date_b') date_b: Date): Promise<ProductSale[]> {
        return this.saleProductService.reportSaleProductByDatese(date_a,date_b)
    }

}
