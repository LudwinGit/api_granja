import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { SellerInput } from './inputs/create-seller.input';
import { Employee } from '../employees/entities/employees.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { SellerWarehouseInput } from './inputs/addwarehouse.input';
import { EmployeesService } from '../employees/employees.service';

@Injectable()
export class SellersService {
    constructor(
        @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
        private readonly employeeService: EmployeesService

    ) { }

    async findAll(): Promise<Seller[]> {
        return await this.sellerRepository.find({ relations: ["employee", "warehouses"] })
    }

    async find(id: number): Promise<Seller> {
        return await this.sellerRepository.findOne(id, { relations: ["employee", "warehouses"] })
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
        let seller = await this.sellerRepository.findOne(id, { relations: ["employee"] })
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        seller.isPreSale = input.isPreSale
        seller.isDirectSale = input.isDirectSale
        seller.employee = employee
        await this.sellerRepository.update(id, seller)
        return seller
    }

    async delete(id: number): Promise<Seller> {
        let seller = await this.sellerRepository.findOne(id)
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        await this.sellerRepository.remove(seller)
        return null
    }

    async addWarehouseToSeller(input: SellerWarehouseInput): Promise<Warehouse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne({ id: input.warehouseId })
        if (!warehouse)
            throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
        let seller: Seller = await this.sellerRepository.findOne({ id: input.sellerId }, { relations: ["warehouses"] })
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        seller.warehouses = [...seller.warehouses, warehouse]
        await this.sellerRepository.save(seller)
        return warehouse
    }

    async removeWarehouseToSeller(input: SellerWarehouseInput): Promise<Warehouse> {
        let seller: Seller = await this.sellerRepository.findOne({ id: input.sellerId }, { relations: ["warehouses"] })
        if (!seller)
            throw new HttpException('Seller Measure Not Found', HttpStatus.NOT_FOUND);
        seller.warehouses = seller.warehouses.filter(warehouse =>
            warehouse.id !== input.warehouseId
        );
        await this.sellerRepository.save(seller)
        return null
    }
}
