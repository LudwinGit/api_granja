import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { Warehouse } from "../warehouses/warehouse.entity";

@ObjectType()
@Entity('warehouse_category')
export class WarehouseCategory{
    @Field()
    @PrimaryColumn({length:50})
    name: string

    @Field()
    @Column({default:true})
    isActive: boolean

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
    
    @OneToMany(type=>Warehouse, warehouse => warehouse.warehouseCategory)
    warehouses: Warehouse[];
}