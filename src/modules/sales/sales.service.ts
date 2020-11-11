import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleInput } from './input/sale.input';
import { Route } from '../routes/entities/route.entity';
import { Seller } from '../sellers/entities/seller.entity';
import { ClientsService } from '../clients/clients.service';
import { SellersService } from '../sellers/sellers.service';
import { RoutesService } from '../routes/routes.service';
import { WarehousesService } from '../warehouses/warehouses.service';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale) private readonly saleRepository: Repository<Sale>,
        private readonly clientService: ClientsService,
        private readonly sellerService: SellersService,
        private readonly routeService: RoutesService,
        private readonly warehouseService: WarehousesService,
    ) { }

    async findAll(): Promise<Sale[]> {
        return await this.saleRepository.find({ relations: ["seller", "route", "client", "warehouse"] })
    }

    async find(id: number): Promise<Sale> {
        return await this.saleRepository.findOne(id, { relations: ["seller", "route", "client", "warehouse"] })
    }

    async findBySeller(sellerId: number): Promise<Sale[]> {
        return await this.saleRepository.find({ where: { seller: sellerId }, relations: ["seller", "route", "client", "warehouse"] })
    }

    async create(input: SaleInput): Promise<Sale> {
        const route: Route = await this.routeService.find(input.routeId)
        if (!route)
            throw new HttpException('Route Not Found', HttpStatus.NOT_FOUND);
        const seller: Seller = await this.sellerService.find(input.sellerId)
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        const client = input.clientId ? await this.clientService.find(input.clientId) : null
        const warehouse = await this.warehouseService.find(input.warehouseId)
        const sale: Sale = this.saleRepository.create(input)
        sale.client = client
        sale.route = route
        sale.seller = seller
        sale.warehouse = warehouse
        await this.saleRepository.save(sale)
        return sale
    }

    async updateTotal(id: number, total: number) {
        const sale = await this.saleRepository.findOne(id)
        sale.total = parseFloat(sale.total.toString()) + parseFloat(total.toString())
        await this.saleRepository.update(id, sale)
    }

    async updateStatus(id: number, status: string): Promise<boolean> {
        await this.saleRepository.update(id, { status })
        return true
    }

    async findPendingByRoutes(routes: number[]): Promise<Sale[]> {

        const sales = await this.saleRepository
            .createQueryBuilder("sale")
            .where(`sale."routeId" IN (:...routes) and sale.status='P' and sale."unificationId" is null`, {routes})
            .orderBy("sale.id", "ASC")
            .getMany()
        return sales
    }
}
