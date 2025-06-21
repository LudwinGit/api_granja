import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class StockWarehouse{
    @Field()
    productid: number

    @Field()
    sku: String

    @Field()
    description: String

    @Field()
    stock: number

    @Field()
    stockpre: number

    @Field()
    totalstock: number
}