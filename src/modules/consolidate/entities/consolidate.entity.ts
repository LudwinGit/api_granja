import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Warehouse } from 'src/modules/warehouses/entitys/warehouse.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ConsolidateProduct } from './consolidateProduct.entity';

@ObjectType()
@Entity()
export class Consolidate {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Warehouse)
  @ManyToOne(
    () => Warehouse,
    warehouse => warehouse.sales,
  )
  warehouse: Warehouse;

  @Field()
  @Column({ type: 'decimal', default: 0 })
  total: number;

  @Field()
  @Column({ type: 'decimal', default: 0 })
  discount: number;

  @Field()
  @Column({ type: 'char', length: 1, default: 'I' })
  status: string;

  @Field({ nullable: true })
  @Column({ type: 'varchar', length: 200, nullable: true })
  observation: string;

  @Field(() => [ConsolidateProduct])
  @OneToMany(
    () => ConsolidateProduct,
    consolidateProduct => consolidateProduct.consolidate,
  )
  consolidateProducts: ConsolidateProduct[];

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
