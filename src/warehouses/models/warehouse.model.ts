import { Field, ObjectType, ID } from "@nestjs/graphql";
import { WarehouseCategoryType } from "src/warehousecategories/models/warehousecategories.model";

@ObjectType()
export class WarehouseType {
    @Field(type => ID)
    id: String

    @Field()
    warehouseCategoyry: WarehouseCategoryType;

    @Field()
    creationDate: Date;

}