import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { SaleInput } from "./input/sale.input";
import { Seller } from '../sellers/entities/seller.entity';
import { SellersService } from '../sellers/sellers.service';
import { Client } from '../clients/client.entity';
import { ClientsService } from '../clients/clients.service';
import { Route } from '../routes/entities/route.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';

@Resolver(() => Sale)
export class SalesResolver {
    constructor(
        private readonly salesService: SalesService,
        private readonly sellerService: SellersService,
        private readonly clientService: ClientsService
    ) { }

    @Query(() => [Sale])
    async sales(): Promise<Sale[]> {
        return this.salesService.findAll()
    }

    @Query(() => [Sale], { nullable: true })
    async salesPendingByRoutes(@Args({ name: 'routes', type: () => [Number] }) routes: number[]): Promise<Sale[]> {
        return this.salesService.findPendingByRoutes(routes)
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

    @Mutation(() => Boolean)
    async updateStatusSale(@Args('id') id: number, @Args('status') status: string): Promise<boolean> {
        return this.salesService.updateStatus(id, status)
    }

    @ResolveField(() => Seller, { nullable: true })
    async seller(@Parent() sale: Sale): Promise<Seller> {
        const seller: Seller = await this.sellerService.find(sale.seller.id)
        return seller
    }

    @ResolveField(() => Client, { nullable: true })
    async client(@Parent() sale: Sale): Promise<Client> {
        const { client } = await this.salesService.find(sale.id)
        return client
    }

    @ResolveField(() => Route, { nullable: true })
    async route(@Parent() sale: Sale): Promise<Route> {
        const { route } = await this.salesService.find(sale.id)
        return route
    }

    @ResolveField(() => Warehouse, { nullable: true })
    async warehouse(@Parent() sale: Sale): Promise<Warehouse> {
        const { warehouse } = await this.salesService.find(sale.id)
        return warehouse
    }
}
