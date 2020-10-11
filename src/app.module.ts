import { ConfigModule, ConfigService } from "@nestjs/config";
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { WarehouseModule } from './modules/warehouses/warehouses.module';
import { WarehouseCategoriesModule } from "./modules/warehousecategories/warehousecategories.module";
import { EmployeesModule } from './modules/employees/employees.module';
import { ProductsModule } from './modules/products/products.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConnectionOptions } from "typeorm";
// import { warehousecategories } from './modules/warehousecategories';
import { MeasuresModule } from './modules/measures/measures.module';
import { SellersModule } from './modules/sellers/sellers.module';
import { RoutesModule } from './modules/routes/routes.module';
import { SalesModule } from './modules/sales/sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    TypeOrmModule.forRootAsync(
      {
        inject: [ConfigService],
        async useFactory(config: ConfigService){
          return{
            type:'postgres',
            host: config.get('DB_HOST'),
            username: config.get('DB_USER'),
            password: config.get('DB_PASSWORD'),
            port: +config.get('DB_PORT'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true, //Solo en desarrollo
            // ssl: true,
          } as ConnectionOptions;
        },
      }
    ),
    WarehouseCategoriesModule,
    WarehouseModule,
    EmployeesModule,
    ProductsModule,
    MeasuresModule,
    SellersModule,
    RoutesModule,
    SalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
