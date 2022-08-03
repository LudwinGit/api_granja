import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { ProductMeasure } from "src/manytomany/productMeasure.entity";
import { SaleProduct } from "../saleproduct/saleproduct.entity";
import { ConsolidateProduct } from "../consolidate/entities/consolidateProduct.entity";

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

    @OneToMany(()=>SaleProduct,saleProduct => saleProduct.measure)
    saleproducts: SaleProduct[]


    @OneToMany(()=>ConsolidateProduct,consolidateProduct => consolidateProduct.measure)
    consolidateProducts: ConsolidateProduct[]

    // @ManyToMany(()=>Product, product => product.measures)
    //// @JoinTable({name:"product_measure"})
    // products: Product[]
}