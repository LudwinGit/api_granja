import { Injectable } from '@nestjs/common';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductInput } from './input/product.input';

@Injectable()
export class ProductsService {
    // constructor(@InjectModel('Product') private readonly modelProduct: Model<Product>,) { }
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
    ){}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find();
    }

    // async findOneById(id:String): Promise<Product>{
    //     return await this.modelProduct.findById(id);
    // }

    async create(input: ProductInput ): Promise<Product>{
        input.description = input.description.toUpperCase()
        input.sku = input.sku.toUpperCase()
        let product: Product = await this.productRepository.create(input);
        await this.productRepository.save(product);
        return product
    }

    // async update(id: String,updateInput: createProductInput):Promise<Product>{
    //     updateInput.sku = updateInput.sku.toUpperCase()
    //     updateInput.description = updateInput.description.toUpperCase()
    //     return await this.modelProduct.findByIdAndUpdate(id,updateInput,{new: false})
    // }

    // async delete(id:String):Promise<Product>{
    //     return await this.modelProduct.findByIdAndRemove(id)
    // }
}
