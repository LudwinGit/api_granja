import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from './schema/warehouse.schema';
import { WarehouseCategoriesModule } from 'src/warehousecategories/warehousecategories.module';
import { WarehouseCategoriesService } from 'src/warehousecategories/warehousecategories.service';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Warehouse',schema:WarehouseSchema}
  ]),WarehouseCategoriesModule],
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehouseModule {}
