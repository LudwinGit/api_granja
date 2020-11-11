import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, ManyToMany } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { UnificationProduct } from "../unificationproduct/unificationproduct.entity";
import { Sale } from "../sales/entities/sale.entity";

@ObjectType()
@Entity()
export class Unification{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Field()
    @Column({type:"varchar",length:"150"})
    observation: string

    @Field()
    @Column({ name: 'date',type:"date" })
    date: Date;

    @Field()
    @Column({type:"char",length:1,default:"I"})
    status: string

    @Field(()=>[UnificationProduct])
    @OneToMany(() => UnificationProduct, unificationProduct => unificationProduct.unification)
    unificationproducts: UnificationProduct[]

    @Field(()=>[Sale])
    @OneToMany(() => Sale, sale => sale.unification)
    sales: Sale[]
}