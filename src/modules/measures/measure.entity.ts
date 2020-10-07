import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Product } from "../products/product.entity";
import { ProductMeasure } from "src/manytomany/productMeasure.entity";

@ObjectType()
@Entity()
export class Measure{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({length:50,unique:true})
    name:string

    @Field()
    @Column()
    unit:number

    @Field()
    @Column({default:true})
    isActive: boolean

    @OneToMany(()=>ProductMeasure,productmeasure => productmeasure.measure)
    productmeasures: ProductMeasure[]

    // @ManyToMany(()=>Product, product => product.measures)
    //// @JoinTable({name:"product_measure"})
    // products: Product[]
}