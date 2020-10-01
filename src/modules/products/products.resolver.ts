import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductInput } from "./input/product.input";

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly producService: ProductsService,
    ){}

    @Query(()=>[Product],{name:"products"})
    async getProducts() {
        return this.producService.findAll();
    }

    // @Query(()=>ProductType,{name:"product"})
    // async getProduct(@Args('id') id:string){
    //     return this.producService.findOneById(id);
    // }

    @Mutation(()=>Product)
    async createProduct(@Args('input') input:ProductInput){
        return this.producService.create(input)
    }

    // @Mutation(()=>ProductType)
    // async updateEmployee(@Args('id') id:string, @Args('input') input:createProductInput){
    //     return this.producService.update(id,input)
    // }

    // @Mutation(()=>ProductType)
    // async removeWarehouse(@Args('id') id: string){
    //     return this.producService.delete(id);
    // }
}
