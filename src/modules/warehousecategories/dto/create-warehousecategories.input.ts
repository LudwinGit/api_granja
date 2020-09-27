import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createWarehouseCategoryInput {
    @Field()
    name: String;

    @Field({ nullable: true })
    logo?: String;
}