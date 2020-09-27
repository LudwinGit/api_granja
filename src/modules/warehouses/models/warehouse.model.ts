import { Field, ObjectType, ID } from "@nestjs/graphql";
import { WarehouseCategoryType } from "src/modules/warehousecategories/models/warehousecategories.model";

@ObjectType()
export class WarehouseType {
    @Field(type => ID)
    id: String

    @Field(type => WarehouseCategoryType)
    warehouseCategory: String;

    @Field()
    name: String;

    @Field()
    creationDate: Date;

}