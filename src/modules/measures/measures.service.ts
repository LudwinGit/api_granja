import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MeasureInput } from './input/measure.input';
import { Measure } from './measure.entity';

@Injectable()
export class MeasuresService {
    constructor(
        @InjectRepository(Measure)
        private readonly measureRepository: Repository<Measure>
    ){}

    async findAll():Promise<Measure[]>{
        return this.measureRepository.find()
    }

    async withoutMeasure(productId:number): Promise<Measure[]>{
        const measures = await
            this.measureRepository
            .createQueryBuilder("measure")
            .leftJoinAndSelect("measure.productmeasures","product","product.productId=:productId",{productId})
            .where("product.measureId is null")
            .getMany()
        return measures
    }

    async find(id:number):Promise<Measure>{
        return await this.measureRepository.findOne({where:{id}});
    }

    async create(input: MeasureInput): Promise<Measure> {
        input.name = input.name.toUpperCase()
        const measure: Measure = await this.measureRepository.create({...input,});
        await this.measureRepository.save(measure)
        return measure
    }

    async update(id:number ,input: MeasureInput): Promise<Measure>{
        input.name = input.name.toUpperCase()
        let measure: Measure = await this.measureRepository.findOne({id})
        if(!measure)
            throw new HttpException('Measure Not Found',HttpStatus.NOT_FOUND);
        await this.measureRepository.update({id},{...input})
        return measure
    }

    async delete(id:number): Promise<Measure>{
        const measure: Measure = await this.measureRepository.findOne({id});
        if(!measure)
            throw new HttpException('Measure Not Found',HttpStatus.NOT_FOUND);
        await this.measureRepository.remove(measure)
        return measure;
    }
}
