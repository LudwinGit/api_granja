import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ProductInput {
    @Field()
    sku: string
    
    @Field()
    description: string

    @Field()
    price_cost: number

    @Field({nullable:true})
    image: string

    @Field({defaultValue: true})
    isActive: boolean

    @Field({defaultValue: 1})
    min_stock: number
}