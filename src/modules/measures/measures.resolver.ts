import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MeasureInput } from './input/measure.input';
import { Measure } from './measure.entity';
import { MeasuresService } from './measures.service';

@Resolver()
export class MeasuresResolver {
    constructor(
        private readonly measureService: MeasuresService
    ){}

    @Query(()=>[Measure],{nullable:true})
    async measures(){
        return this.measureService.findAll();
    }

    @Query(()=>[Measure],{nullable:true})
    async withoutMeasure(@Args('productId') productId: number){
        return this.measureService.withoutMeasure(productId);
    }


    @Query(() => Measure,{nullable:true})
    async measure(@Args('id') id:number){
        return this.measureService.find(id);
    }

    @Mutation(() => Measure)
    async createMeasure(@Args('data') input: MeasureInput) {
        return this.measureService.create(input);
    }

    @Mutation(()=>Measure)
    async updateMeasure(@Args('id') id: number, @Args('data') input:MeasureInput){
        return this.measureService.update(id,input);
    }
    
    @Mutation(() => Measure)
    async removeMeasure(@Args('id') id: number){
        return this.measureService.delete(id);
    }
}
