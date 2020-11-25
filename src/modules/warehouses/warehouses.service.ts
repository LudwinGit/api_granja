import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Warehouse } from './entitys/warehouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseInput } from './input/warehouse.input';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';
import { WarehouseProductInput } from './input/warehouse_product.input';
import { WarehouseProduct } from './entitys/warehouseProduct.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class WarehousesService {
    constructor(
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
        @InjectRepository(WarehouseCategory) private readonly warehouseCategoryRepository: Repository<WarehouseCategory>,
        @InjectRepository(WarehouseProduct) private readonly warehouseProductRepository: Repository<WarehouseProduct>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Warehouse[]> {
        return await this.warehouseRepository.find({ relations: ["warehouseProducts"] });
    }

    async find(id: number): Promise<Warehouse> {
        return await this.warehouseRepository.findOne(id);
    }

    async findByCategory(category: string): Promise<Warehouse[]> {
        return await this.warehouseRepository.find({ category_name: category });
    }

    async warehousesWithoutAddingtoSeller(sellerId: number): Promise<Warehouse[]> {
        const warehouse = await
            this.warehouseRepository
                .createQueryBuilder("warehouse")
                .leftJoinAndSelect("warehouse.sellers", "seller", "seller.id=:sellerId", { sellerId })
                .where("seller.id is null")
                .getMany()
        return warehouse
    }

    async create(input: WarehouseInput): Promise<Warehouse> {
        const warehouseCategory: WarehouseCategory = await this.warehouseCategoryRepository.findOne({ where: { name: input.category_name } });
        if (!warehouseCategory)
            throw new HttpException('Category Warehouse Not Found', HttpStatus.NOT_FOUND);
        const warehouse: Warehouse = this.warehouseRepository.create({ ...input, });
        const products: Product[] = await this.productRepository.find({ where: { warehouse_category_name: input.category_name } })
        await this.warehouseRepository.save(warehouse)
        products.forEach(product => {
            const wp = this.warehouseProductRepository.create({
                productId: product.id,
                warehouseId: warehouse.id,
            })
            this.warehouseProductRepository.save(wp)
        });
        return warehouse
    }

    async update(id: number, input: WarehouseInput): Promise<Warehouse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne(id, { relations: ["warehouseProducts"] })
        const warehouseCategory: WarehouseCategory = await this.warehouseCategoryRepository.findOne({ where: { name: input.category_name } });
        if (!warehouse)
            throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
        if (!warehouseCategory)
            throw new HttpException('Category Warehouse Not Found', HttpStatus.NOT_FOUND);
        await this.warehouseRepository.update({ id }, { ...input })
        return warehouse
    }

    async delete(id: number): Promise<Warehouse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne(id, { relations: ["warehouseProducts", "sales"] });

        if (!warehouse)
            throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
        if (warehouse.sales.length > 0)
            throw new HttpException('No puede eliminar el registro por que ya tiene relacion con ventas', HttpStatus.INTERNAL_SERVER_ERROR);
            if (warehouse.warehouseProducts.length > 0)
            throw new HttpException('No puede eliminar el registro por que ya tiene relacion con ventas', HttpStatus.INTERNAL_SERVER_ERROR);
        await this.warehouseRepository.remove(warehouse)
        return null;
    }

    async addProductToWarehouse(input: WarehouseProductInput): Promise<Warehouse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne({ id: input.warehouseId }, { relations: ["warehouseProducts"] })
        if (!warehouse)
            throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
        const warehouseProduct = new WarehouseProduct()
        warehouseProduct.productId = input.productId
        warehouseProduct.warehouseId = input.warehouseId
        warehouseProduct.stock = input.stock
        await this.warehouseProductRepository.save(warehouseProduct)
        warehouse.warehouseProducts.push(warehouseProduct)
        return warehouse
    }

    async removeProductToWarehouse(input: WarehouseProductInput): Promise<Warehouse> {
        const warehouseProduct = await this.warehouseProductRepository.findOne({ productId: input.productId, warehouseId: input.warehouseId })
        if (!warehouseProduct)
            throw new HttpException('Product Warehouse Not Found', HttpStatus.NOT_FOUND);
        await this.warehouseProductRepository.remove(warehouseProduct)
        return await this.warehouseRepository.findOne({ id: input.warehouseId }, { relations: ["warehouseProducts"] })
    }


}
