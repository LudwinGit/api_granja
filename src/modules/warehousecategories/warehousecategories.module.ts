import { WarehouseCategoriesService } from './warehousecategories.service';
import { Module } from '@nestjs/common';
import { WarehouseCategoriesResolver } from './warehousecategories.resolver';;
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseCategory } from './warehousecategories.entity';

@Module({
  imports:[TypeOrmModule.forFeature([WarehouseCategory])],
  providers: [WarehouseCategoriesService, WarehouseCategoriesResolver],
  exports:[WarehouseCategoriesService]
})
export class WarehouseCategoriesModule { 
}
