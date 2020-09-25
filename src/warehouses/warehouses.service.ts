import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Warehouse } from './interfaces/warehouse.interface';

@Injectable()
export class WarehousesService {
    constructor (@InjectModel('Warehouse') private readonly model:Model<Warehouse>){}

    async findAll():Promise<Warehouse[]>{
        return await this.model.find().exec();
    }

}
