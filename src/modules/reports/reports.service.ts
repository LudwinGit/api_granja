import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../products/product.entity';
import { ProductKardex } from './type/productKardex';
import { ProductSale } from './type/productSale';
import { StockWarehouse } from './type/stockWarehouse';
import { PaginatedProductNetSold } from './type/PaginatedProductNetSold';

@Injectable()
export class ReportsService {
    constructor(
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
    ) { }

    async salesByDates(): Promise<ProductSale[]> {
        return null
    }

    async kardex(date: Date, warehouseId: number, sku: string): Promise<ProductKardex[]> {
        const moment = require('moment-timezone')
        const _date = moment(date).tz("America/Guatemala")
        const products = await this.productRepository.query(`select * from kardex('${_date.format("YYYY-MM-DD")}',${warehouseId},'${sku}')`)
        return products;
    }

    async stockWarehouse(warehouseId: number): Promise<StockWarehouse[]> {
        const stocks = await this.productRepository.query(`select *  from stock(${warehouseId})`)
        return stocks
    }

    async productsNetSold(page = 1, pageSize = 100): Promise<PaginatedProductNetSold> {
        // Build CTE and then use it to get total count and paginated rows
        const cte = `WITH ventas AS (
            SELECT
                    sp."productId",
                    SUM(sp.quantity) AS total_vendido
                FROM sale s
                JOIN sale_product sp ON s.id = sp."saleId"
                WHERE s.status = 'F'
                GROUP BY sp."productId"
            ),
            devoluciones AS (
                SELECT
                    srp."productId",
                    SUM(srp.quantity) AS total_devuelto
                FROM sale_return sr
                JOIN sale_return_product srp ON sr.id = srp."returnId"
                WHERE sr.status = 'F'
                GROUP BY srp."productId"
            ),
        net AS (
        SELECT
            p.id AS "productId",
            p.sku ,
            p.description,
            v.total_vendido - COALESCE(d.total_devuelto, 0) AS cantidad
        FROM ventas v
        JOIN product p ON p.id = v."productId"
        LEFT JOIN devoluciones d ON d."productId" = v."productId"
        WHERE (v.total_vendido - COALESCE(d.total_devuelto, 0) > 0) and p."isActive" = true
        )
    `;

        const offset = (page - 1) * pageSize;

        const countSql = `${cte}SELECT COUNT(*) AS count FROM net`;
        const dataSql = `${cte}SELECT * FROM net ORDER BY cantidad DESC LIMIT ${pageSize} OFFSET ${offset}`;

        const countResult = await this.productRepository.query(countSql);
        const total = parseInt(countResult[0]?.count || '0', 10);

        const rows = await this.productRepository.query(dataSql);

        return {
            data: rows,
            total,
            page,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
        };
    }
}
