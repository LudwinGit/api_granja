import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';
import { SaleReturn } from './entities/sale-return.entity';
import { SaleReturnProduct } from './entities/sale-return-product.entity';
import { SaleReturnInput } from './input/salereturn.input';
import { SalesService } from '../sales/sales.service';
import { ProductsService } from '../products/products.service';
import { MeasuresService } from '../measures/measures.service';
import { WarehouseproductService } from '../warehouseproduct/warehouseproduct.service';
import { InjectConnection } from '@nestjs/typeorm';

@Injectable()
export class SalereturnService {
  constructor(
    @InjectRepository(SaleReturn)
    private readonly saleReturnRepository: Repository<SaleReturn>,

    @InjectRepository(SaleReturnProduct)
    private readonly saleReturnProductRepository: Repository<SaleReturnProduct>,

    @Inject(forwardRef(() => SalesService))
    private readonly salesService: SalesService,

    private readonly productsService: ProductsService,
    private readonly measuresService: MeasuresService,
    private readonly warehouseProductService: WarehouseproductService,

    @InjectConnection()
    private readonly connection: Connection,
  ) {}

  async findAll(): Promise<SaleReturn[]> {
    return await this.saleReturnRepository.find({ relations: ['sale', 'returnProducts'], order: { id: 'DESC' } });
  }

  async find(id: number): Promise<SaleReturn> {
    return await this.saleReturnRepository.findOne(id, { relations: ['sale', 'returnProducts'] });
  }

  async findBySale(saleId: number): Promise<SaleReturn> {
    return await this.saleReturnRepository.findOne({ where: { sale: saleId }, relations: ['sale', 'returnProducts'] });
  }

  async create(input: SaleReturnInput): Promise<SaleReturn> {
    const sale = await this.salesService.find(input.saleId);
    if (!sale) throw new HttpException('Sale Not Found', HttpStatus.NOT_FOUND);
    // check if sale already has a return
    const existing = await this.findBySale(sale.id);
    if (existing) throw new HttpException('Sale already has a return', HttpStatus.BAD_REQUEST);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sr = this.saleReturnRepository.create({
        sale: sale,
        total: input.total || 0,
        observation: input.observation || null,
      });
      const saved = await queryRunner.manager.save(sr);

      const products = input.products || [];
      for (const p of products) {
        // validate product and measure
        const product = await this.productsService.findOne(p.productId);
        if (!product) throw new HttpException('Product Not Found', HttpStatus.NOT_FOUND);
        const measure = await this.measuresService.find(p.measureId);
        if (!measure) throw new HttpException('Measure Not Found', HttpStatus.NOT_FOUND);

        const rp = this.saleReturnProductRepository.create({
          returnId: saved.id,
          productId: p.productId,
          measureId: p.measureId,
          unit_measure: p.unit_measure,
          quantity: p.quantity,
          price: p.price || 0,
          saleReturn: saved,
          product: product,
          measure: measure,
        });
        await queryRunner.manager.save(rp);

        // add stock back to warehouse
        try {
          if (sale.warehouse && sale.warehouse.id)
            await this.warehouseProductService.addStock(p.productId, sale.warehouse.id, p.quantity * p.unit_measure);
        } catch (e) {
          // ignore stock update failures here
        }
      }

      // update sale total by subtracting returned total
      if (input.total) {
        await this.salesService.updateTotal(sale.id, -Math.abs(input.total));
      }

      await queryRunner.commitTransaction();
      return await this.find(saved.id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(error.message || 'Error creating return', HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await queryRunner.release();
    }
  }
}
