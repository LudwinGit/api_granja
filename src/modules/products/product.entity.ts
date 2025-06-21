import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { ProductMeasure } from "src/manytomany/productMeasure.entity";
import { WarehouseProduct } from "../warehouses/entitys/warehouseProduct.entity";
import { TransactionProduct } from "../transactions/entities/transactionProduct.entity";
import { SaleProduct } from "../saleproduct/saleproduct.entity";
import { UnificationProduct } from "../unificationproduct/unificationproduct.entity";
import { ConsolidateProduct } from "../consolidate/entities/consolidateProduct.entity";

@ObjectType()
@Entity({name:'product'})
export class Product{
    @Field()
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Field()
    @Column({length:20,unique:true})
    sku: string

    @Field()
    @Column({length: 150})
    description: string

    @Field()
    @Column({
        type: "decimal",
        default: 0
    })
    price_cost: number

    @Field({nullable:true})
    @Column({nullable:true})
    image: string

    @Field()
    @Column({default:true})
    isActive: boolean

    @Field()
    @Column()
    min_stock: number

    @Field()
    @Column({default:1})
    units_per_package:number

    @Field()
    @Column()
    warehouse_category_name: string

    @Field()
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @Field()
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date   

    @Field(()=>[ProductMeasure])
    @OneToMany(()=>ProductMeasure,productmeasure => productmeasure.product)
    productmeasures: ProductMeasure[]

    // @Field(()=>[ProductMeasure])
    @OneToMany(()=>SaleProduct,saleProduct => saleProduct.product)
    saleproducts: SaleProduct[]

    @OneToMany(() => UnificationProduct, unificationProduct => unificationProduct.product)
    unificationproducts: UnificationProduct[]

    @OneToMany(()=>WarehouseProduct,warehouseProduct => warehouseProduct.product)
    warehouseProducts: WarehouseProduct[]

    @OneToMany(()=>TransactionProduct,transactionProduct => transactionProduct.product)
    transactionProducts: TransactionProduct[]

    @OneToMany(()=>ConsolidateProduct,saleProduct => saleProduct.product)
    consolidateProducts: ConsolidateProduct[]

    // @Field(()=>[Measure])
    // // @ManyToMany(()=>Measure, measure => measure.products)
    // @ManyToMany(()=>Measure)
    // @JoinTable({name:"product_measure"})
    // measures: Measure[]
}