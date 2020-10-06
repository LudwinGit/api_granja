import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Measure } from "../measures/measure.entity";

@ObjectType()
@Entity({name:'product'})
export class Product{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({length:20})
    sku: string

    @Field()
    @Column({length: 150})
    description: string

    @Field()
    @Column({
        type: "decimal",
        default: 0
    })
    price_cost: number

    @Field()
    @Column({nullable:true})
    image: string

    @Field()
    @Column({default:true})
    isActive: boolean

    @Field()
    @Column({name:"measure_default"})
    measure_default:number

    @Field()
    @Column()
    min_stock: number

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date   

    @ManyToMany(()=>Measure)
    @JoinTable({name:"product_measure"})
    measures: Measure[]
}