import { Entity, Column, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { Product } from "src/modules/products/product.entity";
import { Measure } from "src/modules/measures/measure.entity";

@ObjectType()
@Entity({name:"product_measure"})
export class ProductMeasure{
    @Field()
    @PrimaryColumn()
    productId: number

    @Field()
    @PrimaryColumn()
    measureId: number

    @Field()
    @Column({
        type:"decimal",
        default:0
    })
    price: number
    
    // @Field(()=>Product)
    @ManyToOne(()=>Product, product => product.productmeasures)
    product: Product

    @Field(()=>Measure)
    @ManyToOne(()=>Measure, measure => measure.productmeasures)
    measure: Measure
}