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
        const first = await this.findByTitle(newInput.title)
        if (first.length == 0) {
            const createdWarehouse = new this.model(newInput);
            return await createdWarehouse.save();
        }
        return null;
    }

    async findByTitle(ptitle: String): Promise<WarehouseCategory[]> {
        return await this.model.find({ title: ptitle }).exec();
    }
}
