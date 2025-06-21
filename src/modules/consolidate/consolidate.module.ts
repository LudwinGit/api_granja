import { Module } from '@nestjs/common';
import { ConsolidateService } from './consolidate.service';
import { ConsolidateResolver } from './consolidate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consolidate } from './entities/consolidate.entity';
import { ConsolidateProduct } from './entities/consolidateProduct.entity';
import { ConsolidateSale } from './entities/consolidateSale.entity';
import { WarehouseModule } from '../warehouses/warehouses.module';
import { SalesModule } from '../sales/sales.module';
import { SellersModule } from '../sellers/sellers.module';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([Consolidate,ConsolidateProduct,ConsolidateSale]),
    WarehouseModule, SalesModule, SellersModule, RoutesModule
  ],
  providers: [ConsolidateResolver, ConsolidateService]
})
export class ConsolidateModule {}