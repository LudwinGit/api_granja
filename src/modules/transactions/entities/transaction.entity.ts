import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, Column, OneToMany } from "typeorm";
import { Warehouse } from "src/modules/warehouses/entitys/warehouse.entity";
import { TransactionProduct } from "./transactionProduct.entity";

@ObjectType()
@Entity()
export class Transaction{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id:number

    @Field(()=>Warehouse,{nullable:true})
    @ManyToOne(() => Warehouse, warehouse => warehouse.transactions_origin,{nullable:true})
    warehouseOrigin: Warehouse;

    @Field(()=>Warehouse,{nullable:true})
    @ManyToOne(() => Warehouse, warehouse => warehouse.transactions_destiny,{nullable:true})
    warehouseDestiny: Warehouse;
    
    @Field()
    @Column({nullable:true,type:"varchar",length:"150"})
    observation: string

    @Field()
    @Column({type:"char",length:"1",default:"I"})
    status: string

    @Field()
    @Column({type:"char",length:"1"})
    type: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date   

    @Field(()=>[TransactionProduct],{nullable:true})
    @OneToMany(()=>TransactionProduct,transactionProduct => transactionProduct.transaction)
    transactionProducts: TransactionProduct[]
}