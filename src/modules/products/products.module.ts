import { Module } from '@nestjs/common';
import { ProductsResolver } from './products.resolver';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from "./schema/product.schema";

@Module({
  imports:[MongooseModule.forFeature([
    {name:"Product",schema:ProductSchema}
  ])],
  providers: [ProductsResolver, ProductsService]
})
export class ProductsModule {}
