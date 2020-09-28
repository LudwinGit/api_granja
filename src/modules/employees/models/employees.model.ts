import { Field, ObjectType, ID } from "@nestjs/graphql";

@ObjectType()
export class EmployeeType {
    @Field(type => ID)
    id: String

    @Field()
    name: String;

    @Field()
    lastname: String;

    @Field()
    telephone: String;

    @Field()
    dpi: String;

    @Field()
    image: String;

    @Field({nullable:true})
    address: String;

    @Field({nullable:true})
    input_date: Date;
    
    @Field({nullable:true})
    output_date: Date;

    @Field()
    creationDate: Date;
}