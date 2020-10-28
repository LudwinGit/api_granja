import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Route } from "../routes/entities/route.entity";
import { Sale } from "../sales/entities/sale.entity";

@ObjectType()
@Entity()
export class Client {
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({ length: 150 })
    name: string

    @Field()
    @Column({ length: 20, unique: true })
    nit: string

    @Field()
    @Column({ length: 250 })
    address: string

    @Field(() => Route)
    @ManyToOne(() => Route, route => route.sales)
    route: Route;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Sale, sale => sale.client)
    sales: Sale[];
}