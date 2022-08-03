import { PartialType } from '@nestjs/mapped-types';
import { CreateConsolidateInput } from './create-consolidate.input';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateConsolidateInput extends PartialType(CreateConsolidateInput) {
  @Field(() => Int)
  id: number;
}