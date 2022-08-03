import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConsolidateInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}