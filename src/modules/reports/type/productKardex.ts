import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductKardex{
    @Field()
    id: number 

    @Field()
    observation: string

    @Field()
    created: Date

    @Field()
    type: string

    @Field({nullable:true})
    origin: string

    @Field({nullable:true})
    destiny: string

    @Field()
    quantity: number
}