import { Module } from '@nestjs/common';
import { WarehousesService } from './warehouses.service';
import { WarehousesResolver } from './warehouses.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseSchema } from './schema/warehouse.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:'Warehouse',schema:WarehouseSchema}
  ])],
  providers: [WarehousesService, WarehousesResolver]
})
export class WarehouseModule {}
