import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { ProductKardex } from './type/productKardex';
import { ProductSale } from './type/productSale';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository :Repository<Product>,
    ){}

    async salesByDates():Promise<ProductSale[]>{
        return null
    }

    async kardex(date: Date, warehouseId: number, sku: string):Promise<ProductKardex[]>{
        const moment = require('moment-timezone')
        const _date = moment(date).tz("America/Guatemala")
        const products = await this.productRepository.query(`select * from kardex('${_date.format("YYYY-MM-DD")}',${warehouseId},'${sku}')`)
        return products;
    }
}
