import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from '../sales/entities/sale.entity';
import { SaleProduct } from './saleproduct.entity';
import { Repository } from 'typeorm';
import { SaleProductInput } from './input/saleproduct.input';
import { ProductsService } from '../products/products.service';
import { MeasuresService } from '../measures/measures.service';
import { SalesService } from '../sales/sales.service';

@Injectable()
export class SaleproductService {
    constructor(
        @InjectRepository(SaleProduct)
        private readonly saleProductRepository: Repository<SaleProduct>,
        private readonly productService: ProductsService,
        private readonly measureService: MeasuresService,
        private readonly saleService: SalesService
    ) { }

    async findBySale(saleId: number): Promise<SaleProduct[]> {
        return await this.saleProductRepository.find({ where: { saleId }, relations: ["product", "measure", "sale"] })
    }

    async create(input: SaleProductInput): Promise<SaleProduct> {
        const saleProduct = await this.saleProductRepository.findOne({
            where: {
                measureId: input.measureId,
                productId: input.productId,
                saleId: input.saleId
            }
        })
        if (saleProduct)
            throw new HttpException('El producto con la unidad de medida ya ha sido agregado', HttpStatus.CONFLICT);

        const sp = await this.saleProductRepository.create(input)
        const product = await this.productService.findOne(input.productId)
        const measure = await this.measureService.find(input.measureId)
        const sale = await this.saleService.find(input.saleId)
        const subtotal = parseFloat((input.price * input.quantity).toString())
        sale.total = parseFloat(sale.total.toString()) + subtotal
        sp.product = product
        sp.measure = measure
        sp.sale = sale
        await this.saleService.updateTotal(sale.id, subtotal)
        await this.saleProductRepository.save(sp)
        return sp
    }

    async remove(saleId: number, productId: number, measureId: number): Promise<boolean> {
        try {
            const saleProduct = await this.saleProductRepository.findOne({
                where: {
                    measureId,
                    productId,
                    saleId
                }
            })
            const subtotal = parseFloat((saleProduct.price * saleProduct.quantity).toString())
            await this.saleProductRepository.remove(saleProduct)
            await this.saleService.updateTotal(saleId, -subtotal)
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
