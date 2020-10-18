import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Employee } from "src/modules/employees/entities/employees.entity";
import { Sale } from "src/modules/sales/entities/sale.entity";

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

    @OneToMany(() => Sale, sale => sale.seller)
    sales: Sale[];
}