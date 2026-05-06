import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { Repository } from 'typeorm';
import { SellerInput } from './inputs/create-seller.input';
import { Employee } from '../employees/entities/employees.entity';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { SellerWarehouseInput } from './inputs/addwarehouse.input';
import { EmployeesService } from '../employees/employees.service';
import { RoutesService } from '../routes/routes.service';
import { Route } from '../routes/entities/route.entity';

@Injectable()
export class SellersService {
    constructor(
        @InjectRepository(Seller) private readonly sellerRepository: Repository<Seller>,
        @InjectRepository(Warehouse) private readonly warehouseRepository: Repository<Warehouse>,
        private readonly employeeService: EmployeesService,
        private readonly routeService: RoutesService

    ) { }

    async findAll(): Promise<Seller[]> {
        return await this.sellerRepository.find({ relations: ["employee", "warehouses","routes"] })
    }

    async find(id: number): Promise<Seller> {
        return await this.sellerRepository.findOne(id, { relations: ["employee", "warehouses","routes","sales"] })
    }

    async create(employee: Employee, input: SellerInput): Promise<Seller> {
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        const seller = this.sellerRepository.create(input)
        seller.employee = employee
        return await this.sellerRepository.save(seller)
    }

    async update(id: number, employee: Employee, input: SellerInput): Promise<Seller> {
        if (!employee)
            throw new HttpException('Employee Not Found', HttpStatus.NOT_FOUND);
        const seller = await this.sellerRepository.findOne(id, { relations: ["employee"] })
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        seller.isPreSale = input.isPreSale
        seller.isDirectSale = input.isDirectSale
        seller.employee = employee
        await this.sellerRepository.update(id, seller)
        return seller
    }

    async delete(id: number): Promise<Seller> {
        const seller = await this.sellerRepository.findOne(id)
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        await this.sellerRepository.remove(seller)
        return null
    }

    async addWarehouseToSeller(input: SellerWarehouseInput): Promise<Warehouse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne({ id: input.warehouseId })
        if (!warehouse)
            throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
        const seller: Seller = await this.sellerRepository.findOne({ id: input.sellerId }, { relations: ["warehouses"] })
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        seller.warehouses = [...seller.warehouses, warehouse]
        await this.sellerRepository.save(seller)
        return warehouse
    }

    async removeWarehouseToSeller(input: SellerWarehouseInput): Promise<Warehouse> {
        const seller: Seller = await this.sellerRepository.findOne({ id: input.sellerId }, { relations: ["warehouses"] })
        if (!seller)
            throw new HttpException('Seller Measure Not Found', HttpStatus.NOT_FOUND);
        seller.warehouses = seller.warehouses.filter(warehouse =>
            warehouse.id !== input.warehouseId
        );
        await this.sellerRepository.save(seller)
        return null
    }

    async addRouteToSeller(sellerId:number, routeId:number):Promise<Route> {
        const seller: Seller = await this.sellerRepository.findOne({ id: sellerId }, { relations: ["warehouses", "routes"] })
        if (!seller)
            throw new HttpException('Seller Measure Not Found', HttpStatus.NOT_FOUND);
        const route: Route = await this.routeService.find(routeId)
        if (!route)
            throw new HttpException('Route Not Found', HttpStatus.NOT_FOUND);
        seller.routes = [...seller.routes, route]
        await this.sellerRepository.save(seller)
        return route
    }

    async removeRouteToSeller(sellerId:number, routeId:number):Promise<Route> {
        const seller: Seller = await this.sellerRepository.findOne({ id: sellerId }, { relations: ["warehouses","routes"] })
        if (!seller)
            throw new HttpException('Seller Measure Not Found', HttpStatus.NOT_FOUND);
        seller.routes = seller.routes.filter(route =>
            route.id !== routeId
        );
        await this.sellerRepository.save(seller)
        return null
    }
}
