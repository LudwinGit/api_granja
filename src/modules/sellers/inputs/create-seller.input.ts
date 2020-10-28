import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SellerInput{
    @Field()
    isPreSale: boolean

    @Field()
    isDirectSale: boolean

    @Field()
    employeeId: number
}