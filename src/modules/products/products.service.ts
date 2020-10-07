import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './input/product.input';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ) { }

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({ relations: ["measures"] })
    }

    async findOne(id: number): Promise<Product> {
        return await this.productRepository.findOne(id, { relations: ["measures"] });
    }

    async create(input: ProductInput): Promise<Product> {
        input.description = input.description.toUpperCase()
        input.sku = input.sku.toUpperCase()
        let product: Product = await this.productRepository.create(input);
        await this.productRepository.save(product);
        return product
    }

    async update(id: number, updateInput: ProductInput): Promise<Product> {
        updateInput.description = updateInput.description.toUpperCase()
        updateInput.sku = updateInput.sku.toUpperCase()
        let product: Product = await this.productRepository.findOne(id, { relations: ["measures"] });
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.update({ id }, { ...updateInput })
        return product
    }

    async delete(id:number):Promise<Product>{
        let product: Product = await this.productRepository.findOne({ id })
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.remove(product)
        return product
    }
}
