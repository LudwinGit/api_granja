import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Employee } from "src/modules/employees/entities/employees.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Warehouse } from "src/modules/warehouses/entitys/warehouse.entity";
import { Route } from "src/modules/routes/entities/route.entity";
import { Consolidate } from "src/modules/consolidate/entities/consolidate.entity";

@ObjectType()
@Entity()
export class Seller{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({name:"pre_sale"})
    isPreSale: boolean;

    @Field()
    @Column({name:"direct_sale"})
    isDirectSale: boolean;

    @Field(()=>Employee)
    @OneToOne(()=>Employee)
    @JoinColumn()
    employee: Employee

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @Field(()=>[Sale])
    @OneToMany(() => Sale, sale => sale.seller)
    sales: Sale[];

    @Field(()=>[Consolidate])
    @OneToMany(() => Consolidate, consolidate => consolidate.seller)
    consolidates: Consolidate[];

    @Field(()=>[Warehouse])
    @ManyToMany(()=> Warehouse)
    @JoinTable({name:"seller_warehouse"})
    warehouses: Warehouse[]

    @Field(()=>[Route])
    @ManyToMany(()=>Route)
    @JoinTable({name:"seller_route"})
    routes: Route[]
}