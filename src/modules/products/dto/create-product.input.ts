import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createProductInput {
    @Field()
    sku: String
    
    @Field()
    description: String

    @Field()
    price_cost: Number

    @Field({nullable:true})
    image: String

    @Field({defaultValue: 'Active'})
    status: String

    @Field({defaultValue: 1})
    units_package: Number

    @Field({defaultValue: 1})
    min_stock: Number

}