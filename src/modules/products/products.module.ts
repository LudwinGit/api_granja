import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Product])],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
