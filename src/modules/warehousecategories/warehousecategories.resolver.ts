import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { WarehouseCategoriesService } from "./warehousecategories.service";
import { WarehouseCategory  } from "./warehousecategories.entity";
import { WarehouseCategoryInput } from "./input/warehousecategory.input";

@Resolver()
export class WarehouseCategoriesResolver {
    constructor(private readonly service: WarehouseCategoriesService) { }

    @Query(() => [WarehouseCategory],{nullable:true})
    async warehousesCategories() {
        return this.service.findAll();
    }

    @Query(()=> WarehouseCategory,{nullable:true})
    async warehouseCategory(@Args('id') id: string){
        return this.service.find(id.toUpperCase());
    }

    @Mutation(() => WarehouseCategory)
    async createWarehouseCategory(@Args('data') input: WarehouseCategoryInput) {
        return this.service.create(input)
    }
    
    @Mutation(()=>WarehouseCategory)
    async updateWarehouseCategory(@Args('id') id: string, @Args('data') input:WarehouseCategoryInput){
        return this.service.update(id.toUpperCase(),input);
    }
    
    @Mutation(() => WarehouseCategory,{nullable:true})
    async removeWarehouseCategory(@Args('id') id: string){
        return this.service.delete(id.toUpperCase());
    }

}