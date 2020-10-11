import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { MeasuresModule } from '../measures/measures.module';
import { Measure } from '../measures/measure.entity';
import { ProductMeasure } from 'src/manytomany/productMeasure.entity';
import { WarehouseProduct } from '../warehouses/entitys/warehouseProduct.entity';
import { SaleProduct } from '../sales/entities/saleProduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature(
    [
      Product,Measure,ProductMeasure,
      WarehouseProduct,SaleProduct
    ]
  ),MeasuresModule],
  exports:[ProductsService],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
