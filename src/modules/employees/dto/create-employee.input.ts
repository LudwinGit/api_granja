import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class createEmployeeInput {
    @Field()
    name: String

    @Field()
    lastname: String

    @Field()
    telephone: String

    @Field()
    dpi: String

    @Field({nullable:true})
    image: String
    
    @Field({nullable:true})
    address?: String

    @Field({nullable:true})
    input_date?: Date

    @Field({nullable:true})
    output_date?: Date

}