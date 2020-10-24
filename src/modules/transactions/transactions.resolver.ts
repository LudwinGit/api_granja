import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionInput } from './inputs/transaction.input';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { WarehousesService } from '../warehouses/warehouses.service';
import { TransactionProduct } from './entities/transactionProduct.entity';
import { TransactionProductInput } from './inputs/transactionProduct.input';
import { ProductsService } from '../products/products.service';
import { Product } from '../products/product.entity';

@Resolver(() => Transaction)
export class TransactionsResolver {
    constructor(
        private readonly transactionService: TransactionsService,
        private readonly warehouseService: WarehousesService,
        private readonly productService: ProductsService
    ) { }

    @Query(() => [Transaction], { nullable: true })
    async transactions() {
        return this.transactionService.findAll()
    }

    @Query(() => Transaction, { nullable: true })
    async transaction(@Args('id') id: number) {
        const trans = await this.transactionService.find(id)
        return trans
    }

    @Mutation(() => Transaction)
    async createTransaction(@Args('data') input: TransactionInput) {
        return this.transactionService.create(input)
    }

    @Mutation(() => Transaction)
    async updateTransaction(@Args('id') id: number, @Args('data') input: TransactionInput) {
        return this.transactionService.update(id, input)
    }

    @Mutation(() => Transaction, { nullable: true })
    async removeTransaction(@Args('id') id: number) {
        return this.transactionService.delete(id);
    }

    @Mutation(() => TransactionProduct, { nullable: true })
    async addProductToTransaction(@Args('data') input: TransactionProductInput) {
        return this.transactionService.addProduct(input)
    }

    @Mutation(() => TransactionProduct, { nullable: true })
    async removeProductToTransaction(@Args('productId') productId: number, @Args('transactionId') transactionId: number) {
        return this.transactionService.removeProduct(productId,transactionId)
    }

    @ResolveField(() => [TransactionProduct])
    async transactionProducts(@Parent() transaction: Transaction) {
        let { transactionProducts } = transaction
        for (let element of transactionProducts) {
            let product: Product = await this.productService.findOne(element.productId)
            element.product = product
        }
        return transactionProducts
    }
}
