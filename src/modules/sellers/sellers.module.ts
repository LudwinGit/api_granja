import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersResolver } from './sellers.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { EmployeesModule } from '../employees/employees.module';
import { Employee } from '../employees/entities/employees.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Seller,
      Employee
    ])
    ,EmployeesModule],
  providers: [SellersService, SellersResolver],
  exports: [SellersService]
})
export class SellersModule {}
