import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductSale{
    @Field()
    sku: String

    @Field()
    description: String

    @Field()
    units: number

    @Field()
    price_cost: number

    @Field()
    price_sale: number

    @Field()
    category: String
}