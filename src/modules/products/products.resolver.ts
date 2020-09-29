import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductType } from "./models/products.model";
import { createProductInput } from './dto/create-product.input';

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly producService: ProductsService,
    ){}

    @Query(()=>[ProductType],{name:"products"})
    async getProducts() {
        return this.producService.findAll();
    }

    @Query(()=>ProductType,{name:"product"})
    async getProduct(@Args('id') id:String){
        return this.producService.findOneById(id);
    }

    @Mutation(()=>ProductType)
    async createProduct(@Args('input') input:createProductInput){
        return this.producService.create(input)
    }

    @Mutation(()=>ProductType)
    async updateEmployee(@Args('id') id:String, @Args('input') input:createProductInput){
        return this.producService.update(id,input)
    }

    @Mutation(()=>ProductType)
    async removeWarehouse(@Args('id') id: String){
        return this.producService.delete(id);
    }
}
