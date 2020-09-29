import { Injectable } from '@nestjs/common';
import { Product } from './interfaces/employees.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { createProductInput } from './dto/create-product.input';

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly modelProduct: Model<Product>,) { }

    async findAll(): Promise<Product[]> {
        return await this.modelProduct.find().exec();
    }

    async findOneById(id:String): Promise<Product>{
        return await this.modelProduct.findById(id);
    }

    async create(newInput: createProductInput): Promise<Product>{
        newInput.sku = newInput.sku.toUpperCase()
        newInput.description = newInput.description.toUpperCase()
        return await this.modelProduct.create(newInput)
    }

    async update(id: String,updateInput: createProductInput):Promise<Product>{
        updateInput.sku = updateInput.sku.toUpperCase()
        updateInput.description = updateInput.description.toUpperCase()
        return await this.modelProduct.findByIdAndUpdate(id,updateInput,{new: false})
    }

    async delete(id:String):Promise<Product>{
        return await this.modelProduct.findByIdAndRemove(id)
    }
}
