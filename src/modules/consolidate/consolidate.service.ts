import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutesService } from '../routes/routes.service';
import { SalesService } from '../sales/sales.service';
import { SellersService } from '../sellers/sellers.service';
import { WarehousesService } from '../warehouses/warehouses.service';
import { AddSaleConsolidateInput } from './dto/add-sale-consolidate.input';
import { CreateConsolidateInput } from './dto/create-consolidate.input';
import { UpdateConsolidateInput } from './dto/update-consolidate.input';
import { Consolidate } from './entities/consolidate.entity';
import { ConsolidateProduct } from './entities/consolidateProduct.entity';
import { ConsolidateSale } from './entities/consolidateSale.entity';

@Injectable()
export class ConsolidateService {
  constructor(
    @InjectRepository(Consolidate)
    private readonly consolidateRepository: Repository<Consolidate>,
    @InjectRepository(ConsolidateSale)
    private readonly consolidateSaleRepository: Repository<ConsolidateSale>,
    @InjectRepository(ConsolidateProduct)
    private readonly consolidateProductRepository: Repository<
      ConsolidateProduct
    >,
    private readonly warehouseService: WarehousesService,
    private readonly sellerService: SellersService,
    private readonly routeService: RoutesService,
    private readonly saleService: SalesService,
  ) {}

  async create(create: CreateConsolidateInput): Promise<Consolidate> {
    let warehouse = await this.warehouseService.find(create.warehouseId);
    if (!warehouse)
      throw new HttpException('Warehouse Not Found', HttpStatus.NOT_FOUND);
    let seller = await this.sellerService.find(create.sellerId);
    if (!seller)
      throw new HttpException('El vendedor no existe', HttpStatus.NOT_FOUND);
    let route = await this.routeService.find(create.routeId);
    if (!route)
      throw new HttpException('La ruta no existe', HttpStatus.NOT_FOUND);

    const sales = await this.saleService.findPreSaleBySellerAndRoute(
      create.sellerId,
      create.routeId,
    );

    if (sales.length === 0)
      throw new HttpException(
        'La ruta no tiene pre-ventas pendientes',
        HttpStatus.NOT_FOUND,
      );

    const consolidate = this.consolidateRepository.create(create);
    consolidate.warehouse = warehouse;
    consolidate.route = route;
    consolidate.seller = seller;
    consolidate.status = 'F';
    await this.consolidateRepository.save(consolidate);
    if (consolidate.id > 0)
      await this.consolidateRepository.query(
        `select * from generate_consolidate(${consolidate.id},${create.sellerId},${create.routeId})`,
      );

    return consolidate;
  }

  async addSale(data: AddSaleConsolidateInput): Promise<Boolean> {
    try {
      let consolidate = await this.consolidateRepository.findOne(
        data.consolidateId,
      );
      if (!consolidate)
        throw new HttpException('Consolidate Not Found', HttpStatus.NOT_FOUND);
      let sale = await this.saleService.find(data.saleId);
      if (!sale)
        throw new HttpException('Sale Not Found', HttpStatus.NOT_FOUND);
      const consolidateSale = this.consolidateSaleRepository.create(data);
      consolidateSale.sale = sale;
      consolidateSale.consolidate = consolidate;
      await this.consolidateSaleRepository.save(consolidateSale);
      return true;
    } catch (error) {
      return false;
    }
  }

  async removeSale(data: AddSaleConsolidateInput): Promise<Boolean> {
    try {
      let consolidate = await this.consolidateRepository.findOne(
        data.consolidateId,
      );
      if (!consolidate)
        throw new HttpException('Consolidate Not Found', HttpStatus.NOT_FOUND);
      let sale = await this.saleService.find(data.saleId);
      if (!sale)
        throw new HttpException('Sale Not Found', HttpStatus.NOT_FOUND);

      const consolidateSale = await this.consolidateSaleRepository.findOne({
        where: {
          consolidateId: consolidate.id,
          saleId: sale.id,
        },
      });

      if (!consolidateSale)
        throw new HttpException(
          'ConsolidateSale Not Found',
          HttpStatus.NOT_FOUND,
        );

      await this.consolidateSaleRepository.remove(consolidateSale);
      return true;
    } catch (error) {
      return false;
    }
  }

  findAllSalesByConsolidate(idConsolidate: number): Promise<ConsolidateSale[]> {
    return this.consolidateSaleRepository.find({
      where: { consolidateId: idConsolidate },
      relations: ['sale'],
    });
  }

  findAllProductsByConsolidate(
    idConsolidate: number,
  ): Promise<ConsolidateProduct[]> {
    let productos = this.consolidateProductRepository
      .createQueryBuilder('consolidate_product')
      .innerJoinAndSelect('consolidate_product.product', 'product')
      .where('consolidate_product.consolidateId =' + idConsolidate)
      .orderBy('product.description', 'ASC')
      .getMany();
    return productos;
  }

  async findAll(): Promise<Consolidate[]> {
    return await this.consolidateRepository.find({
      relations: ['seller', 'route'],
      order: { id: 'DESC' },
      take: 100,
    });
  }

  async find(id: number): Promise<Consolidate> {
    return await this.consolidateRepository.findOne(id, {
      relations: ['seller', 'route', 'consolidateProducts'],
    });
  }

  update(id: number, updateConsolidateInput: UpdateConsolidateInput) {
    return `This action updates a #${id} consolidate`;
  }

  remove(id: number) {
    return `This action removes a #${id} consolidate`;
  }
}
