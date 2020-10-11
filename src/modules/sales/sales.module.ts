import { Module } from '@nestjs/common';
import { SalesResolver } from './sales.resolver';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { Sale } from './entities/sale.entity';
import { Measure } from '../measures/measure.entity';
import { Product } from '../products/product.entity';
import { SellersModule } from '../sellers/sellers.module';
import { RoutesModule } from '../routes/routes.module';
import { Route } from '../routes/entities/route.entity';
import { Seller } from '../sellers/entities/seller.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Sale,
      Warehouse,
      Measure,
      Product,
      Route,
      Seller]),
    SellersModule
  ],
  providers: [SalesResolver, SalesService]
})
export class SalesModule {}
