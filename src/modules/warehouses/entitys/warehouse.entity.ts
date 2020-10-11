import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { WarehouseCategory } from "../../warehousecategories/warehousecategories.entity";
import { WarehouseProduct } from "./warehouseProduct.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";

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
    category_name: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @ManyToOne(()=>WarehouseCategory, category => category.warehouses,{onUpdate:"CASCADE"})
    @JoinColumn({name:"category_name"})
    warehouseCategory: WarehouseCategory

    @OneToMany(() => Sale, sale => sale.warehouse)
    sales: Sale[];

    @Field(()=>[WarehouseProduct])
    @OneToMany(() => WarehouseProduct, warehouseProduct => warehouseProduct.warehouse)
    public warehouseProducts!: WarehouseProduct[];
}