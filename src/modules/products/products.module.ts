import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { MeasuresModule } from '../measures/measures.module';
import { Measure } from '../measures/measure.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product,Measure]),MeasuresModule],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
