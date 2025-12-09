import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
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
    return this.salereturnService.findBySale(saleId);
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
