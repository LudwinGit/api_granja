import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class WarehouseCategoryInput {
    @Field()
    name: string;

    @Field({nullable:true,defaultValue:true})
    isActive: boolean;
}