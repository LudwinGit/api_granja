import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SaleInput {
    @Field({nullable:true})
    id: number

    @Field()
    type_sale: string

    @Field({ nullable: true })
    warehouseId: number

    @Field({ nullable: true })
    total: number

    @Field({ nullable: true })
    total_seller: number
    
    @Field({ nullable: true })
    discount: number

    @Field({ nullable: true })
    status: string

    @Field({ nullable: true })
    observation: string

    @Field()
    sellerId: number

    @Field({ nullable: true })
    routeId: number

    @Field({ nullable: true })
    clientId: number
}