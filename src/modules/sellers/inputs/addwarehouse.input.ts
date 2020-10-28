import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class SellerWarehouseInput{
    @Field()
    sellerId: number

    @Field()
    warehouseId: number
}