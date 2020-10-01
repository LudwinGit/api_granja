import { Injectable } from '@nestjs/common';
import { Warehouse } from './warehouse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseInput } from './input/warehouse.input';
import { WarehouseCategory } from '../warehousecategories/warehousecategories.entity';

@Injectable()
export class WarehousesService {
    constructor (
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse> ,
        @InjectRepository(WarehouseCategory) private readonly warehouseCategoryRepository: Repository<WarehouseCategory> ,
    ){}

    async findAll():Promise<Warehouse[]>{
        return await this.warehouseRepository.find();
    }

    // async findOneById(id:String):Promise<Warehouse>{
    //     return await this.modelWarehouse.findById(id);
    // }

    async create(input: WarehouseInput): Promise<Warehouse> {
        input.name = input.name.toUpperCase()
        const warehouseCategory: WarehouseCategory = await this.warehouseCategoryRepository.findOne({where: {name:input.warehouseCategory}});
        const warehouse: Warehouse = this.warehouseRepository.create({
            ...input,
            warehouseCategory,
        });
        await this.warehouseRepository.save(warehouse)
        return warehouse
    }

    // async update(ide:String ,updateInput: createWarehouseInput): Promise<Warehouse>{
    //     updateInput.name = updateInput.name.toUpperCase()
    //     return await this.modelWarehouse.findByIdAndUpdate(ide,updateInput,{new:false});
    // }

    // async delete(id:String): Promise<Warehouse>{
    //     return await this.modelWarehouse.findByIdAndRemove(id);
    // }

}
