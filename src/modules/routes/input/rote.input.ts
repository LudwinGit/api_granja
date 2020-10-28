import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class RouteInput{
    @Field()
    description: string
}
