import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { ObjectType, Field } from "@nestjs/graphql";
import { Warehouse } from "src/modules/warehouses/entitys/warehouse.entity";
import { Seller } from "src/modules/sellers/entities/seller.entity";
import { Route } from "src/modules/routes/entities/route.entity";
import { Client } from "src/modules/clients/client.entity";
import { SaleProduct } from "src/modules/saleproduct/saleproduct.entity";

@ObjectType()
@Entity()
export class Sale {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ type: "char", length: 1, comment: "D:DirectSale, P:PreSale" })
    type_sale: string

    @Field(() => Warehouse)
    @ManyToOne(() => Warehouse, warehouse => warehouse.sales)
    warehouse: Warehouse;

    @Field()
    @Column({ type: "decimal", default: 0 })
    total: number

    @Field()
    @Column({ type: "decimal", default: 0 })
    discount: number

    @Field()
    @Column({ type: "char", length: 1, default: "I" })
    status: string

    @Field()
    @Column({ type: "varchar", length: 200, nullable: true })
    observation: string

    // @Field()
    // @Column({nullable:true})
    // cashier: number

    @Field(() => Seller)
    @ManyToOne(() => Seller, seller => seller.sales, { nullable: true })
    seller: Seller;

    @Field(() => Client)
    @ManyToOne(() => Client, client => client.sales, { nullable: true })
    client: Client;

    @Field(() => Route)
    @ManyToOne(() => Route, route => route.sales)
    route: Route;

    @Field()
    @Column({ default: false })
    invoiced: boolean

    // @Field()
    // @Column({nullable:true})
    // consolidated:number

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => SaleProduct, saleProduct => saleProduct.sale)
    saleproducts: SaleProduct[]
}