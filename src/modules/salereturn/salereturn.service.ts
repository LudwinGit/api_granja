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
    return await this.saleReturnRepository.find({
      relations: [
        'sale',
        'sale.saleproducts',
        'sale.seller',
        'sale.seller.employee',
        'sale.client',
        'sale.route',
        'returnProducts',
      ],
      order: { id: 'DESC' },
    });
  }

  async find(id: number): Promise<SaleReturn> {
    return await this.saleReturnRepository.findOne(id, {
      relations: [
        'sale',
        'sale.saleproducts',
        'sale.seller',
        'sale.seller.employee',
        'sale.client',
        'sale.route',
        'returnProducts',
      ],
    });
  }

  async findBySale(saleId: number): Promise<SaleReturn[]> {
    return await this.saleReturnRepository.find({
      where: { sale: saleId },
      relations: [
        'sale',
        'sale.saleproducts',
        'sale.seller',
        'sale.seller.employee',
        'sale.client',
        'sale.route',
        'returnProducts',
      ],
      order: { id: 'DESC' },
    });
  }

  async findByDateRange(from: string, to: string, idseller?: number, status?: string): Promise<SaleReturn[]> {
    // Normalize `from`/`to` to date-only (YYYY-MM-DD) so hours are ignored.
    // Accepts inputs like 'YYYY-MM-DD', 'YYYY-MM-DDTHH:mm:ss', or 'YYYY-MM-DD HH:mm:ss'.
    const normalize = (d: string) => {
      if (!d) return d;
      // split by T or space and take first part
      return d.split('T')[0].split(' ')[0];
    };

    const fromDate = normalize(from);
    const toDate = normalize(to);

    const qb = this.saleReturnRepository
      .createQueryBuilder('sr')
      .leftJoinAndSelect('sr.returnProducts', 'rp')
      .leftJoinAndSelect('sr.sale', 's')
      .leftJoinAndSelect('s.saleproducts', 'sp')
      .leftJoinAndSelect('s.seller', 'sel')
      .leftJoinAndSelect('sel.employee', 'employee')
      .leftJoinAndSelect('s.client', 'client')
      .leftJoinAndSelect('s.route', 'route')
      .where('DATE(sr.created_at) BETWEEN :from AND :to', { from: fromDate, to: toDate });

    if (idseller) {
      qb.andWhere('sel.id = :idseller', { idseller });
    }

    if (status) {
      qb.andWhere('sr.status = :status', { status });
    }

    return await qb.orderBy('sr.created_at', 'DESC').getMany();
  }

  async create(input: SaleReturnInput): Promise<SaleReturn> {
    const sale = await this.salesService.find(input.saleId);
    if (!sale) throw new HttpException('Sale Not Found', HttpStatus.NOT_FOUND);
    // check if sale has any return in a non-'C' status. If so, block creation.
    const existing = await this.findBySale(sale.id);
    if (existing && existing.some(r => r.status && r.status !== 'C'))
      throw new HttpException('Sale has an active return in non-closed status', HttpStatus.BAD_REQUEST);

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const sr = this.saleReturnRepository.create({
        sale: sale,
        total: input.total || 0,
        observation: input.observation || null,
        status: 'F',
      });
      const saved = await queryRunner.manager.save(sr);

      const products = input.products || [];
      for (const p of products) {
        // validate product and measurergba(122, 9, 9, 1)
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

      // NOTE: Do NOT modify the sale total here. Returns are kept for historical
      // records only; the sale total should remain unchanged.

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
