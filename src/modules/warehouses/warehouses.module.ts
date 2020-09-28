import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from './schema/warehouse.schema';
import { WarehouseCategoriesModule } from '../warehousecategories/warehousecategories.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Warehouse',schema:WarehouseSchema}
  ]),WarehouseCategoriesModule],
  exports:[WarehousesService],
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehouseModule {}
