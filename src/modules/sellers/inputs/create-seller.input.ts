import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SellerInput{
    @Field()
    isPresSale: boolean

    @Field()
    isDirectSale: boolean

    @Field()
    employeeId: number
}