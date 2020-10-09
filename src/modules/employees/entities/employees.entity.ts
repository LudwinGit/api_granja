import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class Employee{
    @Field()
    @PrimaryGeneratedColumn()
    id: number

    @Field()
    @Column({length:100})
    name: string;

    @Field()
    @Column({length:100})
    lastname: string;

    @Field()
    @Column({length:20,nullable:true})
    telephone: string;

    @Field()
    @Column({length:20,nullable:true})
    dpi: string;

    @Field()
    @Column({length:150,nullable:true})
    image: string;

    @Field()
    @Column({length:150, nullable:true})
    address: string;

    @Field()
    @Column({default:true})
    isActive: boolean

    @Field()
    @Column({type:"date",nullable:true})
    input_date: Date;
    
    @Field()
    @Column({type:"date",nullable:true})
    output_date: Date;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
}