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
    async sales(): Promise<Sale[]> {
        return this.salesService.findAll()
    }

    @Query(() => [Sale])
    async salesBySeller(@Args('sellerId') id: number): Promise<Sale[]> {
        return this.salesService.findBySeller(id)
    }

    @Query(() => Sale)
    async sale(@Args('id') id: number): Promise<Sale> {
        return this.salesService.find(id)
    }

    @Mutation(() => Sale)
    async createSale(@Args('data') input: SaleInput): Promise<Sale> {
        return this.salesService.create(input)
    }

    @ResolveField(() => Seller, { nullable: true })
    async seller(@Parent() sale: Sale): Promise<Seller> {
        const seller: Seller = await this.sellerService.find(sale.seller.id)
        console.log(seller);
        return seller
    }
}
