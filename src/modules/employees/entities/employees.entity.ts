import { Field, ObjectType, ID } from "@nestjs/graphql";
import { Seller } from "src/modules/sellers/entities/seller.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToOne } from "typeorm";

@ObjectType()
@Entity()
export class Employee{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number

    @Field()
    @Column({length:100})
    name: string;

    @Field()
    @Column({length:100})
    lastname: string;

    @Field({nullable:true})
    @Column({length:20,nullable:true})
    telephone: string;

    @Field({nullable:true})
    @Column({length:20,nullable:true})
    dpi: string;

    @Field({nullable:true})
    @Column({length:150,nullable:true})
    image: string;

    @Field({nullable:true})
    @Column({length:150, nullable:true})
    address: string;

    @Field()
    @Column({default:true,name:"active"})
    isActive: boolean

    @Field({nullable:true})
    @Column({type:"date",nullable:true})
    input_date: Date;
    
    @Field({nullable:true})
    @Column({type:"date",nullable:true})
    output_date: Date;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToOne(type => Seller, seller => seller.employee) // specify inverse side as a second parameter
    seller: Seller;
}