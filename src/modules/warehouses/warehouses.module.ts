import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehouseCategoriesModule } from '../warehousecategories/warehousecategories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';
import { Warehouse } from './entitys/warehouse.entity';
import { Transaction } from '../transactions/entities/transaction.entity';
import { WarehouseProduct } from './entitys/warehouseProduct.entity';
import { ProductsModule } from '../products/products.module';

@Module({
  imports:[TypeOrmModule.forFeature(
    [
      Warehouse,WarehouseCategory,WarehouseProduct,Transaction
    ]),WarehouseCategoriesModule,ProductsModule],
  exports:[WarehousesService],
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehouseModule {}
