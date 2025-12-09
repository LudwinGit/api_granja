import { ObjectType, Field } from '@nestjs/graphql';
import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm';
import { Measure } from 'src/modules/measures/measure.entity';
import { Product } from 'src/modules/products/product.entity';
import { SaleReturn } from './sale-return.entity';

@ObjectType()
@Entity({ name: 'sale_return_product' })
export class SaleReturnProduct {
    @Field()
    @PrimaryColumn()
    returnId: number;

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
    @Column({ type: 'decimal', nullable: true })
    price: number;

    @Field(() => Product)
    @ManyToOne(() => Product, product => product.saleproducts)
    product: Product;

    @Field(() => SaleReturn)
    @ManyToOne(() => SaleReturn, saleReturn => saleReturn.returnProducts)
    saleReturn: SaleReturn;

    @Field(() => Measure)
    @ManyToOne(() => Measure, measure => measure.saleproducts)
    measure: Measure;
}
