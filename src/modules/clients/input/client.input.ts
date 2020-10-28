import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class ClientInput {
    @Field()
    name: string

    @Field()
    nit: string

    @Field()
    address: string

    @Field()
    routeId: number
}