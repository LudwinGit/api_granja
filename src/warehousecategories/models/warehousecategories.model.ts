import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class WarehouseCategoryType {
    @Field(type => ID)
    id: string

    @Field()
    title: string;

    @Field({ nullable: true })
    logo?: string;

    @Field()
    creationDate: Date;

}