const { InputType, Field } = require("@nestjs/graphql");

@InputType()
export class AuthInput {
    @Field()
    username: string

    @Field()
    password: string
}