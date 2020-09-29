import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class ProductType {
    @Field(type => ID)
    id: String

    @Field()
    sku: String;

    @Field()
    description: String;

    @Field()
    price_cost: Number;

    @Field()
    image: String;

    @Field({defaultValue: 'Active'})
    status: String;

    @Field({defaultValue:1})
    units_package: Number

    @Field({defaultValue:1})
    min_stock: Number

    @Field()
    creationDate: Date;
}