import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './input/product.input';
import { Measure } from '../measures/measure.entity';
import { ProductMeasure } from 'src/manytomany/productMeasure.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Measure)
        private measureRepository: Repository<Measure>,
        @InjectRepository(ProductMeasure)
        private productmeasureRepository: Repository<ProductMeasure>,
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
        let product: Product = await this.productRepository.create(input);
        await this.productRepository.save(product);
        return product
    }

    async update(id: number, updateInput: ProductInput): Promise<Product> {
        updateInput.description = updateInput.description.toUpperCase()
        updateInput.sku = updateInput.sku.toUpperCase()
        let product: Product = await this.productRepository.findOne(id, { relations: ["productmeasures"] });
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.update({ id }, { ...updateInput })
        return product
    }

    async delete(id: number): Promise<Product> {
        let product: Product = await this.productRepository.findOne({ id })
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        await this.productRepository.remove(product)
        return product
    }

    async addMeasureToProduct(idproduct: number, idmeasure: number, price: number): Promise<Product> {
        // let product: Product = await this.productRepository.findOne(idproduct, { relations: ["measures"] });
        let product: Product = await this.productRepository.findOne(idproduct, { relations: ["productmeasures"] });
        if (!product)
            throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        let measure: Measure = await this.measureRepository.findOne(idmeasure);
        if (!measure)
            throw new HttpException('Measure Not Found', HttpStatus.NOT_FOUND);
        let productMeasure: ProductMeasure = await this.productmeasureRepository.create(
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
        let productMeasure: ProductMeasure = await this.productmeasureRepository.findOne({productId:idproduct,measureId:idmeasure})
        if(!productMeasure)
            throw new HttpException('Product Measure Not Found',HttpStatus.NOT_FOUND);
        await this.productmeasureRepository.remove(productMeasure)
        return await this.productRepository.findOne(idproduct,{relations:["productmeasures"]})
    }
}
