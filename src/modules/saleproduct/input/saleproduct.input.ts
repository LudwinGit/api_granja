import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SaleProductInput {
    @Field()
    saleId: number

    @Field()
    productId: number

    @Field()
    measureId: number

    @Field()
    unit_measure: number

    @Field()
    quantity: number

    @Field()
    price: number

    @Field({ defaultValue: 0 })
    price_seller: number
}