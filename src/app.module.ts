import { ConfigModule } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseModule } from './modules/warehouses/warehouses.module';
import { WarehouseCategoriesModule } from "./modules/warehousecategories/warehousecategories.module";
import { EmployeesModule } from './modules/employees/employees.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync
    MongooseModule.forRoot('mongodb://localhost/nest',{
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex:true,
    }),
    WarehouseCategoriesModule,
    WarehouseModule,
    EmployeesModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
