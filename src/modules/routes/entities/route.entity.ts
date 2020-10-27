import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Sale } from "src/modules/sales/entities/sale.entity";
import { Client } from "src/modules/clients/client.entity";

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
}