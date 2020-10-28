import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class MeasureInput{
    @Field()
    name: string
    
    @Field()
    unit: number

    @Field({defaultValue:true,nullable:true})
    isActive: boolean
}

