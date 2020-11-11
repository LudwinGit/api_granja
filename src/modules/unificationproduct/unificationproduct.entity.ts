import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Product } from "../products/product.entity";
import { Unification } from "../unifications/unification.entity";

@ObjectType()
@Entity()
export class UnificationProduct{
    @PrimaryColumn()
    unificationId: number

    @PrimaryColumn()
    productId:number

    @Field()
    @Column({type:"smallint"})
    unit: number

    @Field()
    @Column({type:"smallint"})
    package: number

    @Field()
    @Column({type:"smallint"})
    unit_package:number

    @Field(()=>Product)
    @ManyToOne(()=>Product, product => product.unificationproducts)
    product: Product

    @Field(()=>Unification)
    @ManyToOne(()=>Unification, unification => unification.unificationproducts)
    unification: Unification
}