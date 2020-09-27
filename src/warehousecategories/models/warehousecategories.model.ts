import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class WarehouseCategoryType {
    @Field(type => ID)
    id: string

    @Field()
    name: string;

    @Field({ nullable: true })
    logo?: string;

    @Field()
    creationDate: Date;

}