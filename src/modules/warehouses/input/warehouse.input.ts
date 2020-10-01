import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class WarehouseInput {
    @Field()
    name: string
    
    @Field()
    invoicing:boolean
    
    @Field()
    category_name: string
}