import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Column()
    units_package:number

    @Field()
    @Column()
    min_stock: number

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}