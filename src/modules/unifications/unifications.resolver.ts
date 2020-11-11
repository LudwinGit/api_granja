import { Resolver, Query, Args, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { UnificationsService } from './unifications.service';
import { Unification } from './unification.entity';
import { UnificationInput } from './input/unification.input';

@Resolver(() => Unification)
export class UnificationsResolver {
    constructor(
        private readonly unificationService: UnificationsService
    ) { }

    @Query(() => [Unification])
    async unifications(): Promise<Unification[]> {
        return this.unificationService.findAll()
    }

    @Query(() => Unification)
    async unification(@Args('id') id: number): Promise<Unification> {
        return this.unificationService.findOne(id)
    }

    @ResolveField(() => Date)
    async date(@Parent() unification: Unification) {
        const { date } = unification
        return new Date(date)
    }

    @Mutation(() => Unification)
    async createUnification(@Args('data') input: UnificationInput): Promise<Unification> {
        return this.unificationService.create(input)
    }

    @Mutation(() => Unification)
    async updateUnification(@Args('id') id: number, @Args('data') input: UnificationInput): Promise<Unification> {
        return this.unificationService.update(id, input)
    }

    @Mutation(() => Unification)
    async removeUnification(@Args('id') id: number): Promise<Unification> {
        return this.unificationService.remove(id)
    }

    @Mutation(() => Unification)
    async addSaleToUnification(@Args('unificationId') id: number, @Args('saleId') saleId: number) {
        return this.unificationService.addSale(id, saleId)
    }

    @Mutation(() => Unification)
    async addSalesToUnification(@Args('id') unificationId: number, @Args({ name: 'data', type: () => [Number] }) sales: number[]) {
        return this.unificationService.addSales(unificationId, sales)
    }
}
