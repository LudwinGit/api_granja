import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductInput } from "./input/product.input";

@Resolver()
export class ProductsResolver {
    constructor(
        private readonly producService: ProductsService,
    ){}

    @Query(()=>[Product],{name:"products",nullable:true})
    async products() {
        return this.producService.findAll();
    }

    @Query(()=>Product,{name:"product",nullable:true})
    async product(@Args('id') id:number){
        return this.producService.findOne(id);
    }

    @Mutation(()=>Product)
    async createProduct(@Args('data') input:ProductInput){
        return this.producService.create(input)
    }

    @Mutation(()=>Product)
    async updateProduct(@Args('id') id:number, @Args('data') input:ProductInput){
        return this.producService.update(id,input)
    }

    @Mutation(()=>Product,{nullable:true})
    async removeProduct(@Args('id') id: number){
        return this.producService.delete(id);
    }

    @Mutation(()=>Product,{nullable:true})
    async addMeasureToProduct(@Args('idproduct')idproduct:number,@Args('idmeasure')idmeasure:number){
        return this.producService.addMeasureToProduct(idproduct,idmeasure)
    }
}
