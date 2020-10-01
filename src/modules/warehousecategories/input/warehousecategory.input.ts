import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class WarehouseCategoryInput {
    @Field()
    name: string;

    @Field()
    isActive: boolean;
}