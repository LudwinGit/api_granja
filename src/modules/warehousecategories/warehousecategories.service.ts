import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { WarehouseCategory } from './interfaces/warehousecategories.interface';
import { createWarehouseCategoryInput } from './dto/create-warehousecategories.input';

@Injectable()
export class WarehouseCategoriesService {
    constructor(@InjectModel('WarehouseCategory') private readonly model: Model<WarehouseCategory>) { }

    async findAll(): Promise<WarehouseCategory[]> {
        return await this.model.find().exec();
    }

    async create(newInput: createWarehouseCategoryInput): Promise<WarehouseCategory> {
        newInput.name = newInput.name.toUpperCase();
        const createdWarehouse = new this.model(newInput);
        return await createdWarehouse.save();
    }

    async findByTitle(ptitle: String): Promise<WarehouseCategory[]> {
        return await this.model.find({ title: ptitle }).exec();
    }

    async findById(id:String):Promise<WarehouseCategory>{
        return await this.model.findById(id);
    }

    async delete(id: String):Promise<WarehouseCategory>{
        return await this.model.findByIdAndRemove(id);
    }

    async update(id:String, input: createWarehouseCategoryInput): Promise<WarehouseCategory>{
        return await this.model.findByIdAndUpdate(id,input,{new:false});
    }
}
