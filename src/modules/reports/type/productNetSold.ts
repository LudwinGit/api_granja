import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class ProductNetSold {
  @Field()
  productId: number;

  @Field()
  sku: string;

  @Field()
  description: string;

  @Field()
  cantidad: number;
}
