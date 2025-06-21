import { Module } from '@nestjs/common';
import { SalesResolver } from './sales.resolver';
import { SalesService } from './sales.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { SellersModule } from '../sellers/sellers.module';
import { RoutesModule } from '../routes/routes.module';
import { WarehouseModule } from '../warehouses/warehouses.module';
import { ClientsModule } from '../clients/clients.module';
import { SaleproductModule } from '../saleproduct/saleproduct.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Sale]),
    SellersModule, RoutesModule, WarehouseModule,ClientsModule
  ],
  exports:[SalesService],
  providers: [SalesResolver, SalesService]
})
export class SalesModule { }
