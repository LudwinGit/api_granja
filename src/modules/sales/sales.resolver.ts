import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { SaleInput } from "./input/sale.input";
import { Seller } from '../sellers/entities/seller.entity';
import { SellersService } from '../sellers/sellers.service';

@Resolver(() => Sale)
export class SalesResolver {
    constructor(
        private readonly salesService: SalesService,
        private readonly sellerService: SellersService
    ) { }

    @Query(() => [Sale])
    async sales() {
        return this.salesService.findAll()
    }

    @Mutation(() => Sale)
    async createSale(@Args('data') input: SaleInput) {
        return this.salesService.create(input)
    }

    @ResolveField(() => Seller, { nullable: true })
    async seller(@Parent() sale: Sale) {
        const seller:Seller = await this.sellerService.find(sale.seller.id)
        console.log(seller);
        return seller
    }
}
