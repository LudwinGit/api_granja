import { Injectable, HttpStatus, HttpException, Inject, forwardRef } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './input/product.input';
import { Measure } from '../measures/measure.entity';
import { ProductMeasure } from 'src/manytomany/productMeasure.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { WarehousesService } from '../warehouses/warehouses.service';
import { WarehouseproductService } from '../warehouseproduct/warehouseproduct.service';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Measure)
        private measureRepository: Repository<Measure>,
        @InjectRepository(ProductMeasure)
        private productmeasureRepository: Repository<ProductMeasure>,
        @Inject(forwardRef(() => WarehousesService))
        private warehouseService: WarehousesService,
        private warehouseProductService: WarehouseproductService
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ["productmeasures"] })
        // return await this.productRepository.find({ relations: ["measures"] })
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne(id, { relations: ["productmeasures"] });
    }

    async create(input: ProductInput): Promise<Product> {
        input.description = input.description.toUpperCase()
        input.sku = input.sku.toUpperCase()
        input.warehouse_category_name = input.warehouse_category_name.toUpperCase()
        const product: Product = await this.productRepository.create(input);
        await this.productRepository.save(product);
        const warehouses: Warehouse[] = await this.warehouseService.findByCategory(input.warehouse_category_name);
        warehouses.forEach(warehouse => {
            this.warehouseProductService.create({
                productId: product.id,
                warehouseId: warehouse.id,
                stock: 0
            });
        });
        return product
    }

    async update(id: number, updateInput: ProductInput): Promise<Product> {
        updateInput.description = updateInput.description.toUpperCase()
        updateInput.sku = updateInput.sku.toUpperCase()
        updateInput.warehouse_category_name = updateInput.warehouse_category_name.toUpperCase()
        const product: Product = await this.productRepository.findOne(id, { relations: ["productmeasures"] });
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.update({ id }, { ...updateInput })
        return product
    }

    async delete(id: number): Promise<Product> {
        const product: Product = await this.productRepository.findOne({ id })
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.remove(product)
        return null
    }

    async addMeasureToProduct(idproduct: number, idmeasure: number, price: number): Promise<Product> {
        // let product: Product = await this.productRepository.findOne(idproduct, { relations: ["measures"] });
        const product: Product = await this.productRepository.findOne(idproduct, { relations: ["productmeasures"] });
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        const measure: Measure = await this.measureRepository.findOne(idmeasure);
        if (!measure)
            throw new HttpException('Measure Not Found', HttpStatus.NOT_FOUND);
        const productMeasure: ProductMeasure = await this.productmeasureRepository.create(
            {
                productId: idproduct,
                measureId: idmeasure,
                price: price
            }
        )
        await this.productmeasureRepository.save(productMeasure)
        product.productmeasures.push(productMeasure);
        // await this.productRepository.save(product)
        return product
    }

    async removeMeasureToProduct(idproduct: number, idmeasure: number): Promise<Product> {
        const productMeasure: ProductMeasure = await this.productmeasureRepository.findOne({ productId: idproduct, measureId: idmeasure })
        if (!productMeasure)
            throw new HttpException('Product Measure Not Found', HttpStatus.NOT_FOUND);
        await this.productmeasureRepository.remove(productMeasure)
        return await this.productRepository.findOne(idproduct, { relations: ["productmeasures"] })
    }
}
