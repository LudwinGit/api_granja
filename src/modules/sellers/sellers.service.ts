import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { SellerInput } from './inputs/create-seller.input';
import { Employee } from '../employees/entities/employees.entity';

@Injectable()
export class SellersService {
    constructor(
        @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>
    ) { }

    async findAll(): Promise<Seller[]> {
        return await this.sellerRepository.find({ relations: ["employee"] })
    }

    async find(id: number): Promise<Seller> {
        return await this.sellerRepository.findOne(id, { relations: ["employee"] })
    }

    async create(employee: Employee, input: SellerInput): Promise<Seller> {
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        let seller = this.sellerRepository.create(input)
        seller.employee = employee
        return await this.sellerRepository.save(seller)
    }

    async update(id: number, employee: Employee, input: SellerInput): Promise<Seller> {
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        let seller = await this.sellerRepository.findOne(id,{relations:["employee"]})
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        seller.isPresSale = input.isPresSale
        seller.isDirectSale = input.isDirectSale
        seller.employee = employee
        await this.sellerRepository.update(id,seller)
        return seller
    }

    async delete(id: number): Promise<Seller> {
        let seller = await this.sellerRepository.findOne(id)
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        await this.sellerRepository.remove(seller)
        return null
    }
}
