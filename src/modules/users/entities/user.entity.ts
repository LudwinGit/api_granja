import { ObjectType, Field } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Employee } from "src/modules/employees/entities/employees.entity";

@ObjectType()
@Entity({ name: "user" })
export class User {
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({ length: 50, unique: true })
    username: string

    @Field()
    @Column({ length: 250 })
    password: string

    @Field()
    @Column({ default: "U", type: "char", length: 1 })
    type: string

    @Field()
    @Column({ default: true, name: "active" })
    isActive: boolean

    @Field(() => Employee)
    @OneToOne(() => Employee)
    @JoinColumn()
    employee: Employee
}