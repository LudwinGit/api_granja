import { forwardRef, Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { MeasuresModule } from '../measures/measures.module';
import { Measure } from '../measures/measure.entity';
import { ProductMeasure } from 'src/manytomany/productMeasure.entity';
import { WarehouseProduct } from '../warehouses/entitys/warehouseProduct.entity';
import { SaleProduct } from '../sales/entities/saleProduct.entity';
import { TransactionProduct } from '../transactions/entities/transactionProduct.entity';
import { WarehouseModule } from '../warehouses/warehouses.module';
import { WarehouseproductModule } from '../warehouseproduct/warehouseproduct.module';

@Module({
  imports:[TypeOrmModule.forFeature(
    [
      Product,Measure,ProductMeasure,
      WarehouseProduct,SaleProduct,TransactionProduct
    ]
  ),MeasuresModule,forwardRef(()=>WarehouseModule),WarehouseproductModule],
  exports:[ProductsService],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
