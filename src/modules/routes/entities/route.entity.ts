import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Client } from "src/modules/clients/client.entity";
import { Seller } from "src/modules/sellers/entities/seller.entity";

@ObjectType()
@Entity({ name: 'route' })
export class Route {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ length: 150 })
    description: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @OneToMany(() => Sale, sale => sale.route)
    sales: Sale[];

    @OneToMany(() => Client, client => client.route)
    clients: Client[];

    @ManyToMany(()=> Seller)
    @JoinTable({name:"seller_route"})
    sellers: Seller[]
}