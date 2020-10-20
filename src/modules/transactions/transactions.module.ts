import { Module } from '@nestjs/common';
import { TransactionsResolver } from './transactions.resolver';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { WarehouseModule } from '../warehouses/warehouses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [Transaction, Warehouse]
    ),
    WarehouseModule],
  providers: [TransactionsResolver, TransactionsService]
})
export class TransactionsModule { }
