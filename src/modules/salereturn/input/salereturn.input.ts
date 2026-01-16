import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SaleReturnProductInput {
  @Field()
  productId: number;

  @Field()
  measureId: number;

  @Field()
  unit_measure: number;

  @Field()
  quantity: number;

  @Field({ nullable: true })
  price?: number;
}

@InputType()
export class SaleReturnInput {
  @Field()
  saleId: number;

  @Field({ nullable: true })
  total?: number;

  @Field({ nullable: true })
  observation?: string;

  @Field(() => [SaleReturnProductInput], { nullable: true })
  products?: SaleReturnProductInput[];
}
