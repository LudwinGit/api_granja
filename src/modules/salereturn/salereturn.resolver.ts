import { Resolver, Query, Mutation, Args, ResolveField, Parent, Int } from '@nestjs/graphql';
import { SalereturnService } from './salereturn.service';
import { SaleReturn } from './entities/sale-return.entity';
import { SaleReturnInput } from './input/salereturn.input';
import { Sale } from 'src/modules/sales/entities/sale.entity';

@Resolver(() => SaleReturn)
export class SalereturnResolver {
  constructor(private readonly salereturnService: SalereturnService) {}

  @Query(() => [SaleReturn])
  async saleReturns(): Promise<SaleReturn[]> {
    return this.salereturnService.findAll();
  }

  @Query(() => SaleReturn, { nullable: true })
  async saleReturn(@Args('id') id: number): Promise<SaleReturn> {
    return this.salereturnService.find(id);
  }

  @Query(() => SaleReturn, { nullable: true })
  async saleReturnBySale(@Args('saleId') saleId: number): Promise<SaleReturn> {
    const arr = await this.salereturnService.findBySale(saleId);
    return arr && arr.length ? arr[0] : null;
  }

  @Query(() => [SaleReturn], { name: 'saleReturnsBySale' })
  async saleReturnsBySale(@Args('saleId') saleId: number): Promise<SaleReturn[]> {
    return this.salereturnService.findBySale(saleId);
  }

  @Query(() => [SaleReturn], { name: 'saleReturnsByDate' })
  async saleReturnsByDate(
    @Args('from') from: string,
    @Args('to') to: string,
    @Args('idseller', { type: () => Int, nullable: true }) idseller?: number,
    @Args('status', { nullable: true }) status?: string,
  ): Promise<SaleReturn[]> {
    return this.salereturnService.findByDateRange(from, to, idseller, status);
  }

  @Mutation(() => SaleReturn)
  async createSaleReturn(@Args('data') input: SaleReturnInput): Promise<SaleReturn> {
    return this.salereturnService.create(input);
  }

  @ResolveField(() => Sale)
  async sale(@Parent() saleReturn: SaleReturn): Promise<Sale> {
    const { sale } = await this.salereturnService.find(saleReturn.id);
    return sale;
  }
}
