import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse } from './interfaces/warehouse.interface';
import { createWarehouseInput } from './dto/create-warehouse.input';

@Injectable()
export class WarehousesService {
    constructor (@InjectModel('Warehouse') private readonly modelWarehouse:Model<Warehouse>){}

    async findAll():Promise<Warehouse[]>{
        return await this.modelWarehouse.find().exec();
    }

    async findOneById(id:String):Promise<Warehouse>{
        return await this.modelWarehouse.findById(id);
    }

    async create(newInput: createWarehouseInput): Promise<Warehouse> {
        newInput.name = newInput.name.toUpperCase()
        const newWarehouse = new this.modelWarehouse(newInput)
        return await newWarehouse.save()
    }

    async update(ide:String ,updateInput: createWarehouseInput): Promise<Warehouse>{
        updateInput.name = updateInput.name.toUpperCase()
        return await this.modelWarehouse.findByIdAndUpdate(ide,updateInput,{new:false});
    }

    async delete(id:String): Promise<Warehouse>{
        return await this.modelWarehouse.findByIdAndRemove(id);
    }

}
