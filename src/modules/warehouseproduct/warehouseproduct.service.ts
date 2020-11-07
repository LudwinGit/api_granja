import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionProduct } from '../transactions/entities/transactionProduct.entity';
import { WarehouseProduct } from '../warehouses/entitys/warehouseProduct.entity';
import { WarehouseProductInput } from './warehouseproduct.input';

@Injectable()
export class WarehouseproductService {
    constructor(
        @InjectRepository(WarehouseProduct)
        private readonly warehouseproductRepository: Repository<WarehouseProduct>
    ) { }

    async findByWarehouse(warehouseId: number): Promise<WarehouseProduct[]> {
        const products = await
            this.warehouseproductRepository
                .createQueryBuilder("warehouse_product")
                .leftJoinAndSelect("warehouse_product.product", "product")
                .where(`warehouse_product.warehouseId=${warehouseId}`)
                .orderBy("product.description")
                .getMany()
        return products
    }

    async create(input: WarehouseProductInput): Promise<WarehouseProduct> {
        const wp: WarehouseProduct = await this.warehouseproductRepository.create(input)
        this.warehouseproductRepository.save(wp)
        return wp
    }

    async getStock(productId: number, warehouseId: number): Promise<number> {
        const { stock } = await this.warehouseproductRepository.findOne({ where: { productId, warehouseId } })
        return stock
    }

    async updateStock(products: TransactionProduct[], warehouseId: number, operation: string): Promise<boolean> {
        try {
            if (operation === "-") {
                for (const tp of products) {
                    this.subtractStock(tp.productId, warehouseId, ((tp.units + (tp.packages * tp.units_per_package))))
                    // const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId: tp.productId, warehouseId } })
                    // wp.stock = wp.stock - ((tp.units + (tp.packages * tp.units_per_package)))
                    // this.warehouseproductRepository.update({ warehouseId, productId: wp.productId }, { ...wp })
                }
            }
            else if (operation === "+") {
                for (const tp of products) {
                    this.addStock(tp.productId, warehouseId, ((tp.units + (tp.packages * tp.units_per_package))))
                    // const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId: tp.productId, warehouseId } })
                    // wp.stock = wp.stock + ((tp.units + (tp.packages * tp.units_per_package)))
                    // this.warehouseproductRepository.update({ warehouseId, productId: wp.productId }, { ...wp })
                }
            }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }

    async subtractStock(productId: number, warehouseId: number, units: number): Promise<boolean> {
        try {
            const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId, warehouseId } })
            wp.stock = wp.stock - units
            this.warehouseproductRepository.update({ warehouseId, productId }, { ...wp })
            return true
        } catch (error) {
            return false
        }
    }

    async addStock(productId: number, warehouseId: number, units: number): Promise<boolean> {
        try {
            const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId, warehouseId } })
            wp.stock = wp.stock + units
            this.warehouseproductRepository.update({ warehouseId, productId }, { ...wp })
            return true
        } catch (error) {
            return false
        }
    }

}
