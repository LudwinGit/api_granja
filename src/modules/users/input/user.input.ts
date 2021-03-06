import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class UserInput {
    @Field()
    username: string

    @Field()
    password: string

    @Field()
    employeeId: number

    @Field()
    type: string

    @Field()
    isActive: boolean
}