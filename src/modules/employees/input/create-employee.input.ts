import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createEmployeeInput {
    @Field()
    name: string

    @Field()
    lastname: string

    @Field({nullable:true})
    telephone: string

    @Field({nullable:true})
    dpi: string

    @Field({nullable:true})
    image: string
    
    @Field({nullable:true})
    address: string

    @Field({defaultValue:true,nullable:true})
    isActive: boolean

    @Field({nullable:true})
    input_date?: string

    @Field({nullable:true})
    output_date?: string
}