import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ClientInput {
    @Field()
    name: string

    @Field({nullable:true})
    nit: string

    @Field()
    address: string

    @Field()
    routeId: number
}