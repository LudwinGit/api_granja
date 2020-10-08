import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, Column, ManyToOne, PrimaryColumn } from "typeorm";
import { Product } from "src/modules/products/product.entity";
import { Warehouse } from "src/modules/warehouses/entitys/warehouse.entity";

@ObjectType()
@Entity({name:"warehouse_product"})
export class WarehouseProduct{
    @Field()
    @PrimaryColumn()
    public productId!:number

    @Field()
    @PrimaryColumn()
    public warehouseId!:number

    @Field({nullable:true})
    @Column({nullable:true})
    default_measure: number

    @Field()
    @Column()
    stock:number

    @Field(()=>Product)
    @ManyToOne(()=>Product, product => product.warehouseProducts,{
        primary:true
    })
    product!: Product

    @Field(()=>Warehouse)
    @ManyToOne(()=>Warehouse, Warehouse => Warehouse.warehouseProducts,{
        primary:true
    })
    warehouse!: Warehouse
}