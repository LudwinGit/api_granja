import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Unification } from './unification.entity';
import { UnificationInput } from "./input/unification.input";
import { Repository } from 'typeorm';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class UnificationsService {
    constructor(
        @InjectRepository(Unification)
        private readonly unificationRepository: Repository<Unification>,
        private readonly saleService: SalesService
    ) { }

    async findAll(): Promise<Unification[]> {
        return this.unificationRepository.find({ relations: ["sales", "unificationproducts"] })
    }

    async findOne(id: number): Promise<Unification> {
        return this.unificationRepository.findOne(id, { relations: ["sales"] })
    }

    async create(input: UnificationInput): Promise<Unification> {
        const unification = await this.unificationRepository.create(input)
        await this.unificationRepository.save(unification)
        return unification
    }

    async update(id: number, input: UnificationInput): Promise<Unification> {
        const unification = await this.unificationRepository.findOne(id)
        await this.unificationRepository.update(id, input)
        return unification
    }

    async remove(id: number): Promise<Unification> {
        const unification = await this.unificationRepository.findOne(id)
        await this.unificationRepository.delete(unification)
        return null
    }

    async addSale(id: number, saleId: number): Promise<Unification> {
        const unification = await this.unificationRepository.findOne(id, { relations: ["sales"] })
        const sale = await this.saleService.find(saleId)
        unification.sales = [...unification.sales, sale]
        await this.unificationRepository.save(unification)
        return unification
    }

    async addSales(id: number, sales: number[]): Promise<Unification> {
        const unification = await this.unificationRepository.findOne(id, { relations: ["sales"] })

        for(const saleId of sales){
            const sale = await this.saleService.find(saleId)
            unification.sales = [...unification.sales, sale]
        }
        
        await this.unificationRepository.save(unification)
        return unification
    }

}
