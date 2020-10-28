import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseProduct } from '../warehouses/entitys/warehouseProduct.entity';
import { WarehouseproductService } from './warehouseproduct.service';

@Module({
  imports:[TypeOrmModule.forFeature([WarehouseProduct])],
  exports:[WarehouseproductService],
  providers: [WarehouseproductService]
})
export class WarehouseproductModule {}
