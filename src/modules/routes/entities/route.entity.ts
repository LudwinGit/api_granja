import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({name:'route'})
export class Route{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({length:150})
    description: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date
}