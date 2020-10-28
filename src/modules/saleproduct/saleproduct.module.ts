import { Module } from '@nestjs/common';
import { SaleproductService } from './saleproduct.service';
import { SaleproductResolver } from './saleproduct.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleProduct } from './saleproduct.entity';
import { SalesModule } from '../sales/sales.module';
import { ProductsModule } from '../products/products.module';
import { MeasuresModule } from '../measures/measures.module';

@Module({
  imports:[TypeOrmModule.forFeature([SaleProduct]),SalesModule,MeasuresModule,ProductsModule],
  providers: [SaleproductService, SaleproductResolver]
})
export class SaleproductModule {}
