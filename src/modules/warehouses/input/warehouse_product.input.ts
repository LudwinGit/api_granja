import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class WarehouseProductInput {
    @Field()
    productId: number
    
    @Field()
    warehouseId: number
    
    @Field({nullable:true,defaultValue:0})
    stock: number
}