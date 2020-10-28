import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersResolver } from './sellers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/entities/employees.entity';
import { WarehouseModule } from '../warehouses/warehouses.module';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Seller,
      Employee,
      Warehouse
    ])
    ,EmployeesModule,WarehouseModule],
  providers: [SellersService, SellersResolver],
  exports: [SellersService]
})
export class SellersModule {}
