import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionInput } from './inputs/transaction.input';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { WarehousesService } from '../warehouses/warehouses.service';

@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(
        private readonly transactionService: TransactionsService,
        private readonly warehouseService: WarehousesService
    ) { }

    @Query(() => [Transaction])
    async transactions() {
        return this.transactionService.findAll()
    }

    @Query(() => [Transaction])
    async transaction(@Args('id') id: number) {
        return this.transactionService.find(id)
    }

    @Mutation(() => Transaction)
    async createTransaction(@Args('data') input: TransactionInput) {
        return this.transactionService.create(input)
    }

    @Mutation(()=>Transaction)
    async updateTransaction(@Args('id') id:number, @Args('data') input:TransactionInput){
        return this.transactionService.update(id,input)
    }

    @Mutation(()=>Transaction,{nullable:true})
    async removeTransaction(@Args('id') id: number){
        return this.transactionService.delete(id);
    }
}
