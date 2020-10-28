import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseCategoryInput } from './input/warehousecategory.input';
import { WarehouseCategory } from './warehousecategories.entity';

@Injectable()
export class WarehouseCategoriesService {
    constructor(
        @InjectRepository(WarehouseCategory) 
        private warehousecategoryRepository: Repository<WarehouseCategory>
    ){}
    async findAll(): Promise<WarehouseCategory[]> {
        return await this.warehousecategoryRepository.find();
    }

    async create(input: WarehouseCategoryInput): Promise<WarehouseCategory> {
        input.name = input.name.toUpperCase();
        let category = await this.warehousecategoryRepository.findOne({
            where: {name: input.name}
        })
        if(category)
            throw new HttpException('Category already exists',HttpStatus.NOT_MODIFIED);
        category = await this.warehousecategoryRepository.create(input)
        await this.warehousecategoryRepository.save(category)
        return category;
    }

    async find(id:string):Promise<WarehouseCategory>{
        return await this.warehousecategoryRepository.findOne(id);
    }

    async update(id:string, input: WarehouseCategoryInput): Promise<WarehouseCategory>{
        input.name = input.name.toUpperCase()
        let category = await this.warehousecategoryRepository.findOne({
            where: {name: id}
        })
        let newcategory = await this.warehousecategoryRepository.findOne({
            where: {name: input.name}
        })
        if(!category)
            throw new HttpException('Not found',HttpStatus.NOT_FOUND);
        if((category.name != input.name) && newcategory)
            throw new HttpException('Category already exists',HttpStatus.NOT_MODIFIED);
        await this.warehousecategoryRepository.update({name:id},{...input})
        return await this.find(input.name)
    }

    async delete(id: string):Promise<WarehouseCategory>{
        const category:WarehouseCategory = await this.warehousecategoryRepository.findOne({
            where: {name: id}
        })
        if(!category)
            throw new HttpException('Not found',HttpStatus.NOT_FOUND);
        await this.warehousecategoryRepository.remove(category)
        return null
    }
}