import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { WarehouseModule } from '../warehouses/warehouses.module';
import { TransactionProduct } from './entities/transactionProduct.entity';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Transaction, Warehouse,TransactionProduct,Product]
    ),
    WarehouseModule,ProductsModule],
  providers: [TransactionsResolver, TransactionsService]
})
export class TransactionsModule { }
