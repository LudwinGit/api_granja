import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Measure } from 'src/modules/measures/measure.entity';
import { Product } from 'src/modules/products/product.entity';
import { Consolidate } from './consolidate.entity';
import { Sale } from 'src/modules/sales/entities/sale.entity';

@ObjectType()
@Entity({ name: 'consolidate_sale' })
export class ConsolidateSale {
  @Field()
  @PrimaryColumn()
  consolidateId: number;

  @Field()
  @PrimaryColumn()
  saleId: number;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @Field(() => Sale)
  @ManyToOne(
    () => Sale,
    sale => sale.saleConsolidates,
  )
  sale: Sale;

  @Field(() => Consolidate)
  @ManyToOne(
    () => Consolidate,
    consolidate => consolidate.consolidateProducts,
  )
  consolidate: Consolidate;
}
