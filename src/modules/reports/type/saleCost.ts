import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class SaleCost{
    @Field()
    id: number

    @Field()
    date: Date

    @Field()
    total: number

    @Field()
    total_cost: number

    @Field()
    clientname: String

    @Field()
    sellername: String

    @Field()
    routename: String
}