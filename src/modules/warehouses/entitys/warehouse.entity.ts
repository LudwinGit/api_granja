import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable} from "typeorm";
import { WarehouseCategory } from "../../warehousecategories/warehousecategories.entity";
import { WarehouseProduct } from "./warehouseProduct.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Seller } from "src/modules/sellers/entities/seller.entity";
import { Transaction } from "src/modules/transactions/entities/transaction.entity";

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

    @OneToMany(() => Transaction, transaction => transaction.warehouseOrigin)
    transactions_origin: Transaction[];

    @OneToMany(() => Transaction, transaction => transaction.warehouseDestiny)
    transactions_destiny: Transaction[];

    @Field(()=>[WarehouseProduct])
    @OneToMany(() => WarehouseProduct, warehouseProduct => warehouseProduct.warehouse)
    public warehouseProducts!: WarehouseProduct[];

    @ManyToMany(()=> Seller)
    @JoinTable({name:"seller_warehouse"})
    sellers: Seller[]
}