import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema/employee.schema';
import { WarehouseModule } from '../warehouses/warehouses.module';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Employee",schema:EmployeeSchema}
  ]),WarehouseModule],
  providers: [EmployeesService, EmployeesResolver]
})
export class EmployeesModule {}
