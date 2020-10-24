import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";
import { Transaction } from "./transaction.entity";
import { Product } from "src/modules/products/product.entity";
import { Measure } from "src/modules/measures/measure.entity";

@ObjectType()
@Entity({ name: "transaction_product" })
export class TransactionProduct {
    @Field()
    @PrimaryColumn()
    transactionId: number

    @Field()
    @PrimaryColumn()
    productId: number

    @Field()
    @Column()
    units: number

    @Field()
    @Column()
    packages: number
    
    @Field()
    @Column()
    units_per_package: number

    @Field(()=>Transaction)
    @ManyToOne(()=>Transaction, transaction => transaction.transactionProducts,{
        primary:true
    })
    transaction!: Transaction

    @Field(()=>Product)
    @ManyToOne(()=>Product, product => product.transactionProducts,{
        primary:true
    })
    product!: Product
}