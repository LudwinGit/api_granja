import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UnificationInput{
    @Field()
    observation: string

    @Field(()=>Date)
    date: Date
    
    @Field({nullable:true})
    status: string

}