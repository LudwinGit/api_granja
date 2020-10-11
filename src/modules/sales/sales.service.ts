import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { SaleInput } from './input/sale.input';
import { Route } from '../routes/entities/route.entity';
import { Seller } from '../sellers/entities/seller.entity';

@Injectable()
export class SalesService {
    constructor(
        @InjectRepository(Sale) private readonly saleRepository:Repository<Sale>,
        @InjectRepository(Route) private readonly routeRepository:Repository<Route>,
        @InjectRepository(Seller) private readonly sellerRepository:Repository<Seller>
    ){}

    async findAll():Promise<Sale[]>{
        return await this.saleRepository.find({relations:["seller","route"]})
    }

    async create(input:SaleInput):Promise<Sale>{
        const route:Route = await this.routeRepository.findOne(input.routeId)
        if (!route)
            throw new HttpException('Route Not Found', HttpStatus.NOT_FOUND);
        const seller:Seller = await this.sellerRepository.findOne(input.sellerId)
        if (!seller)
            throw new HttpException('Seller Not Found', HttpStatus.NOT_FOUND);
        const sale:Sale = this.saleRepository.create(input)
        sale.route = route
        sale.seller = seller
        await this.saleRepository.save(sale)
        return sale
    }
}
