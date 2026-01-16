import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryColumn, Column, OneToOne, JoinColumn, ManyToOne } from "typeorm";
import { Measure } from "src/modules/measures/measure.entity";
import { Product } from "src/modules/products/product.entity";
import { Sale } from "../sales/entities/sale.entity";

@ObjectType()
@Entity({ name: "sale_product" })
export class SaleProduct {
    @Field()
    @PrimaryColumn()
    saleId: number

    @Field()
    @PrimaryColumn()
    productId: number

    @Field()
    @PrimaryColumn()
    measureId: number

    @Column()
    @Field()
    unit_measure: number

    @Field()
    @Column()
    quantity: number

    @Field()
    @Column({ type: "decimal" })
    price: number

    @Field()
    @Column({ type: "decimal", default: 0 })
    price_seller: number

    @Field(() => Product)
    @ManyToOne(() => Product, product => product.saleproducts)
    product: Product

    @Field(() => Sale)
    @ManyToOne(() => Sale, sale => sale.saleproducts)
    sale: Sale

    @Field(() => Measure)
    @ManyToOne(() => Measure, measure => measure.saleproducts)
    measure: Measure
}