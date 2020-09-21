import { Resolver, Query, Mutation, Args } from "@nestjs/graphql";
import { WarehouseCategoriesService } from "./warehousecategories.service";
import { WarehouseCategoryType } from "./models/warehousecategories.model";
import { createWarehouseCategoryInput } from "./dto/create-warehousecategories.input";

@Resolver()
export class WarehouseCategoriesResolver {
    constructor(private readonly service: WarehouseCategoriesService) { }

    @Query(() => [WarehouseCategoryType])
    async warehousesCategories() {
        return this.service.findAll();
    }

    @Mutation(() => WarehouseCategoryType)
    async createWarehouseCategories(@Args('input') input: createWarehouseCategoryInput) {
        const warehouseCategory = await this.service.create(input);
        if (warehouseCategory != null) {
            return warehouseCategory;
        }
        const error = new TypeError()
        error.message = "WarehouseCategory is already exists.";
        return error;
    }
}