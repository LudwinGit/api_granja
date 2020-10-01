import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Measure{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({length:50,unique:true})
    name:string

    @Field()
    @Column()
    unit:number

    @Field()
    @Column({default:true})
    isActive: boolean
}