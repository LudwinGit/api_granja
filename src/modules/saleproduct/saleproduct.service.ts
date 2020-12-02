import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SaleProduct } from './saleproduct.entity';
import { Repository } from 'typeorm';
import { SaleProductInput } from './input/saleproduct.input';
import { ProductsService } from '../products/products.service';
import { MeasuresService } from '../measures/measures.service';
import { SalesService } from '../sales/sales.service';
import { WarehouseproductService } from '../warehouseproduct/warehouseproduct.service';
import { ProductSale } from '../reports/type/productSale';

@Injectable()
export class SaleproductService {
    constructor(
        @InjectRepository(SaleProduct)
        private readonly saleProductRepository: Repository<SaleProduct>,
        private readonly productService: ProductsService,
        private readonly measureService: MeasuresService,
        private readonly saleService: SalesService,
        private readonly warehouseProductService: WarehouseproductService
    ) { }

    async findBySale(saleId: number): Promise<SaleProduct[]> {
        return await this.saleProductRepository.find({ where: { saleId }, relations: ["product", "measure", "sale"] })
    }

    async create(input: SaleProductInput): Promise<SaleProduct> {
        const sale = await this.saleService.find(input.saleId)
        const measure = await this.measureService.find(input.measureId)
        const saleProduct = await this.saleProductRepository.findOne({
            where: {
                measureId: input.measureId,
                productId: input.productId,
                saleId: input.saleId
            }
        })
        if (saleProduct)
            throw new HttpException('El producto con la unidad de medida ya ha sido agregado', HttpStatus.INTERNAL_SERVER_ERROR);

        const stock = await this.warehouseProductService.getStock(input.productId, sale.warehouse.id)

        if (stock < (input.quantity * measure.unit))
            throw new HttpException(`La existencia es menor a lo solicitado (existencia: ${stock})`, HttpStatus.INTERNAL_SERVER_ERROR);
        const sp = await this.saleProductRepository.create(input)
        const product = await this.productService.findOne(input.productId)
        const subtotal = parseFloat((input.price * input.quantity).toString())
        sale.total = parseFloat(sale.total.toString()) + subtotal
        sp.product = product
        sp.measure = measure
        sp.sale = sale
        await this.saleService.updateTotal(sale.id, subtotal)
        await this.saleProductRepository.save(sp)
        await this.warehouseProductService.subtractStock(input.productId, sale.warehouse.id, (input.quantity * measure.unit))
        return sp
    }

    async remove(saleId: number, productId: number, measureId: number): Promise<boolean> {
        try {
            const { warehouse } = await this.saleService.find(saleId)
            const saleProduct = await this.saleProductRepository.findOne({
                where: {
                    measureId,
                    productId,
                    saleId
                }
            })
            const subtotal = parseFloat((saleProduct.price * saleProduct.quantity).toString())
            await this.warehouseProductService.addStock(productId, warehouse.id, saleProduct.quantity * saleProduct.unit_measure)
            await this.saleProductRepository.remove(saleProduct)
            await this.saleService.updateTotal(saleId, -subtotal)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async reportSaleProductByDatese(date_a:Date,date_b:Date): Promise<ProductSale[]> {
        process.env.TZ = 'America/Guatemala'
        console.log(date_a);

        var isoDate = new Date().toISOString()

        console.log(isoDate);
        
        
        const dateA = date_a.getFullYear()+'-' + (date_a.getMonth()+1) + '-'+date_a.getDate()
        const dateB = date_b.getFullYear()+'-' + (date_b.getMonth()+1) + '-'+date_b.getDate()
        return await this.saleProductRepository.query(`select * from salesByDate('${dateA}','${dateB}')`)
    }
}
