import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SaleInput{
    @Field()
    type_sale: string

    @Field({nullable:true})
    discount: number

    @Field({nullable:true})
    status: string

    @Field({nullable:true})
    observation:string

    @Field({nullable:true})
    sellerId:number

    @Field()
    routeId:number
}