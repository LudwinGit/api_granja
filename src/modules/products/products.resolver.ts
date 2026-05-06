import { Resolver, Query, Args, Mutation, ResolveField, Parent, ResolveProperty } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { ProductInput } from "./input/product.input";
import { ProductMeasure } from 'src/manytomany/productMeasure.entity';
import { MeasuresService } from '../measures/measures.service';
import { Measure } from '../measures/measure.entity';

@Resolver(()=>Product)
export class ProductsResolver {
    constructor(
        private readonly producService: ProductsService,
        private readonly measureService: MeasuresService
    ){}

    @Query(()=>[Product],{name:"products",nullable:true})
    async products() {
        return this.producService.findAll();
    }

    @Query(()=>Product,{name:"product",nullable:true})
    async product(@Args('id') id:number){
        return this.producService.findOne(id);
    }

    @ResolveField(()=>[ProductMeasure])
    async productmeasures(@Parent() product:Product)
    {
        const {productmeasures} = await this.producService.findOne(product.id)
        for(const element of productmeasures){
            const measure:Measure = await this.measureService.find(element.measureId)
            element.measure = measure
        }
        return productmeasures
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
    async addMeasureToProduct(
        @Args('idproduct')idproduct:number,
        @Args('idmeasure')idmeasure:number,
        @Args('price')price:number
    ){
        return this.producService.addMeasureToProduct(idproduct,idmeasure,price)
    }

    @Mutation(()=>Product)
    async removeMeasureToProduct(
        @Args('idproduct')idproduct:number,
        @Args('idmeasure')idmeasure:number
    ){
        return this.producService.removeMeasureToProduct(idproduct,idmeasure)
    }
}
