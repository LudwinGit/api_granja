import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TransactionInput{
    @Field({nullable:true})
    warehouseOriginId: number

    @Field({nullable:true})
    warehouseDestinyId: number

    @Field({nullable:true})
    observation: string

    @Field({nullable:true})
    status: string

    @Field()
    type: string
}