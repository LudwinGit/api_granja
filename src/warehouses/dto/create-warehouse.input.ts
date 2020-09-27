import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createWarehouseInput {
    @Field()
    warehouseCategory: String

    @Field()
    name: String
}