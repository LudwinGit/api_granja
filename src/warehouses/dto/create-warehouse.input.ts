import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createWarehouseInput {
    @Field()
    warehouseCategoryId: String;
}