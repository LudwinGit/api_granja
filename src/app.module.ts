import { ConfigModule } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseModule } from './modules/warehouses/warehouses.module';
import { WarehouseCategoriesModule } from "./modules/warehousecategories/warehousecategories.module";
import { EmployeesModule } from './modules/employees/employees.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest',{
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex:true,
    }),
    WarehouseCategoriesModule,
    WarehouseModule,
    EmployeesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
