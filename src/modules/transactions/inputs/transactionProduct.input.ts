import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class TransactionProductInput{
    @Field()
    transactionId: number

    @Field()
    productId: number

    @Field()
    units: number

    @Field()
    packages: number

    @Field()
    units_per_package:number
}