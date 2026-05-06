import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ConsolidateService } from './consolidate.service';
import { Consolidate } from './entities/consolidate.entity';
import { CreateConsolidateInput } from './dto/create-consolidate.input';
import { UpdateConsolidateInput } from './dto/update-consolidate.input';
import { AddSaleConsolidateInput } from './dto/add-sale-consolidate.input';
import { ConsolidateSale } from './entities/consolidateSale.entity';
import { ConsolidateProduct } from './entities/consolidateProduct.entity';
import { Seller } from '../sellers/entities/seller.entity';
import { Route } from '../routes/entities/route.entity';

@Resolver(() => Consolidate)
export class ConsolidateResolver {
  constructor(private readonly consolidateService: ConsolidateService) {}

  @Mutation(() => Consolidate)
  createConsolidate(@Args('data') data: CreateConsolidateInput) {
    return this.consolidateService.create(data);
  }

  @Mutation(() => Boolean)
  addSaleToConsolidate(@Args('data') data: AddSaleConsolidateInput) {
    return this.consolidateService.addSale(data);
  }

  @Mutation(() => Boolean)
  removeSaleToConsolidate(@Args('data') data: AddSaleConsolidateInput) {
    return this.consolidateService.removeSale(data);
  }

  @Query(() => [ConsolidateSale])
  async salesByConsolidate(
    @Args('consolidateId') consoldiateId: number,
  ): Promise<ConsolidateSale[]> {
    return this.consolidateService.findAllSalesByConsolidate(consoldiateId);
  }

  @Query(() => [ConsolidateProduct])
  async productsByConsolidate(
    @Args('consolidateId') consolidateId: number,
  ): Promise<ConsolidateProduct[]> {
    return this.consolidateService.findAllProductsByConsolidate(consolidateId);
  }

  @Query(() => [Consolidate])
  async consolidates(): Promise<Consolidate[]> {
    return this.consolidateService.findAll();
  }

  @Query(()=>Consolidate)
  async consolidate(@Args('consolidateId') consolidateId : number){
    return this.consolidateService.find(consolidateId)
  }

  @Mutation(() => Consolidate)
  updateConsolidate(
    @Args('data') updateConsolidateInput: UpdateConsolidateInput,
  ) {
    return this.consolidateService.update(
      updateConsolidateInput.id,
      updateConsolidateInput,
    );
  }

  @Mutation(() => Consolidate)
  removeConsolidate(@Args('id', { type: () => Int }) id: number) {
    return this.consolidateService.remove(id);
  }

  @ResolveField(() => Seller, { nullable: true })
  async seller(@Parent() consolidate: Consolidate): Promise<Seller> {
    const { seller } = await this.consolidateService.find(consolidate.id);
    return seller;
  }

  @ResolveField(() => Route, { nullable: true })
  async route(@Parent() consolidate: Consolidate): Promise<Route> {
    const { route } = await this.consolidateService.find(consolidate.id);
    return route;
  }
}
