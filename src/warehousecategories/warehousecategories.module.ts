import { Module } from '@nestjs/common';
import { WarehouseCategoriesService } from './warehousecategories.service';
import { WarehouseCategoriesResolver } from './warehousecategories.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseCategorySchema } from './schema/warehousecategories.schema';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'WarehouseCategory', schema: WarehouseCategorySchema }
  ])],
  exports: [WarehouseCategoriesService],
  providers: [WarehouseCategoriesService, WarehouseCategoriesResolver]
})
export class WarehouseCategoriesModule { }
