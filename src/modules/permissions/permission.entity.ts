import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/entities/user.entity";

@ObjectType()
@Entity()
export class Permission{
    @Field()
    @PrimaryGeneratedColumn({type:"smallint"})
    id:number

    @Field()
    @Column({length:50})
    name:string

    @ManyToMany(()=> User)
    @JoinTable({name:"user_permission"})
    users: User[]
}