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

    async create(input: WarehouseProductInput): Promise<WarehouseProduct> {
        const wp: WarehouseProduct = await this.warehouseproductRepository.create(input)
        this.warehouseproductRepository.save(wp)
        return wp
    }

    async updateStock(products: TransactionProduct[], warehouseId: number, operation: string): Promise<boolean> {
        try {
            if (operation === "-") {
                for (const tp of products) {
                    const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId: tp.productId, warehouseId } })
                    wp.stock = wp.stock - ((tp.units + (tp.packages * tp.units_per_package)))
                    this.warehouseproductRepository.update({ warehouseId, productId: wp.productId }, { ...wp })
                }
            }
            else if (operation === "+") {
                for (const tp of products) {
                    const wp: WarehouseProduct = await this.warehouseproductRepository.findOne({ where: { productId: tp.productId, warehouseId } })
                    wp.stock = wp.stock + ((tp.units + (tp.packages * tp.units_per_package)))
                    this.warehouseproductRepository.update({ warehouseId, productId: wp.productId }, { ...wp })
                }
            }
            return true
        } catch (error) {
            console.log(error);
            return false
        }
    }


}
