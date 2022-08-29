import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class AddSaleConsolidateInput {
  @Field()
  consolidateId: number

  @Field()
  saleId: number
}