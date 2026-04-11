import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Measure } from 'src/modules/measures/measure.entity';
import { Product } from 'src/modules/products/product.entity';
import { Consolidate } from './consolidate.entity';

@ObjectType()
@Entity({ name: 'consolidate_product' })
export class ConsolidateProduct {
  @Field()
  @PrimaryColumn()
  consolidateId: number;

  @Field()
  @PrimaryColumn()
  productId: number;

  @Field()
  @PrimaryColumn()
  measureId: number;

  @Column()
  @Field()
  unit_measure: number;

  @Field()
  @Column()
  quantity: number;

  @Field()
  @Column({ type: 'decimal', default: 0 })
  price: number;

  @Field()
  @Column({ type: 'decimal', default: 0 })
  price_seller: number;

  @Field(() => Product)
  @ManyToOne(
    () => Product,
    product => product.consolidateProducts,
  )
  product: Product;

  @Field(() => Consolidate)
  @ManyToOne(
    () => Consolidate,
    consolidate => consolidate.consolidateProducts,
  )
  consolidate: Consolidate;

  @Field(() => Measure)
  @ManyToOne(
    () => Measure,
    measure => measure.consolidateProducts,
  )
  measure: Measure;
}
