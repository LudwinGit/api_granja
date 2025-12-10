import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Sale } from 'src/modules/sales/entities/sale.entity';
import { SaleReturnProduct } from './sale-return-product.entity';

@ObjectType()
@Entity({ name: 'sale_return' })
export class SaleReturn {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => Sale)
    @ManyToOne(() => Sale, sale => (sale as any).saleReturns)
    @JoinColumn({ name: 'sale_id' })
    sale: Sale;

    @Field()
    @Column({ type: 'decimal', default: 0 })
    total: number;

    @Field({ nullable: true })
    @Column({ type: 'varchar', length: 200, nullable: true })
    observation: string;

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @Field()
    @Column({ type: "char", length: 1, default: "I", comment: "I:In Process, F:Finalized, C:Cancelled" })
    status: string

    @Field(() => [SaleReturnProduct])
    @OneToMany(() => SaleReturnProduct, rp => rp.saleReturn)
    returnProducts: SaleReturnProduct[];
}
