import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { WarehouseCategoriesModule } from '../warehousecategories/warehousecategories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';
import { Warehouse } from './warehouse.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Warehouse,WarehouseCategory]),WarehouseCategoriesModule],
  exports:[WarehousesService],
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehouseModule {}
