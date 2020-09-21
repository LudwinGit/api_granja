import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createWarehouseCategoryInput {
    @Field()
    title: String;

    @Field({ nullable: true })
    logo?: String;
}