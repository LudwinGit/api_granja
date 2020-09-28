import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeSchema } from './schema/employee.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Employee",schema:EmployeeSchema}
  ])],
  providers: [EmployeesService, EmployeesResolver]
})
export class EmployeesModule {}
