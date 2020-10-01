import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { WarehouseCategory } from "../warehousecategories/warehousecategories.entity";

@ObjectType()
@Entity()
export class Warehouse{    
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Field()
    @Column({length:50})
    name: string

    @Field()
    @Column({default:false})
    invoicing: boolean

    @Field()
    @Column({name:"category_name"})
    categoryName: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(type=>WarehouseCategory, category => category.warehouses)
    @JoinColumn({name:"category_name"})
    warehouseCategory: WarehouseCategory
    // @ManyToOne(
    //     ()=>WarehouseCategory,
    //     category => category.warehouseConnection,
    //     {primary:true},
    // )
    // @JoinColumn({name:"warehouseCategory"})
    // categoryConnection: Promise<WarehouseCategory>;
}