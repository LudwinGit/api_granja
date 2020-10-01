import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    async find(id:number):Promise<Warehouse>{
        return await this.warehouseRepository.findOne({where:{id}});
    }

    async create(input: WarehouseInput): Promise<Warehouse> {
        input.name = input.name.toUpperCase()
        const warehouseCategory: WarehouseCategory = await this.warehouseCategoryRepository.findOne({where: {name:input.category_name}});
        if(!warehouseCategory)
            throw new HttpException('Category Warehouse Not Found',HttpStatus.NOT_FOUND);
        const warehouse: Warehouse = this.warehouseRepository.create({...input,});
        await this.warehouseRepository.save(warehouse)
        return warehouse
    }

    async update(id:number ,input: WarehouseInput): Promise<Warehouse>{
        input.name = input.name.toUpperCase()
        let warehouse: Warehouse = await this.warehouseRepository.findOne({id})
        let warehouseCategory: WarehouseCategory = await this.warehouseCategoryRepository.findOne({where: {name:input.category_name}});
        if(!warehouse)
            throw new HttpException('Warehouse Not Found',HttpStatus.NOT_FOUND);
        if(!warehouseCategory)
            throw new HttpException('Category Warehouse Not Found',HttpStatus.NOT_FOUND);
        await this.warehouseRepository.update({id},{...input})
        return warehouse
    }

    async delete(id:number): Promise<Warehouse>{
        const warehouse: Warehouse = await this.warehouseRepository.findOne({id});
        if(!warehouse)
            throw new HttpException('Warehouse Not Found',HttpStatus.NOT_FOUND);
        await this.warehouseRepository.remove(warehouse)
        return warehouse;
    }
}
