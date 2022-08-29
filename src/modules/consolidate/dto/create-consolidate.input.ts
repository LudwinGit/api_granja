import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateConsolidateInput {
  @Field()
  observation: string;

  @Field()
  warehouseId: number;

  @Field()
  sellerId: number;
  
  @Field()
  routeId: number;
}