import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionInput } from './inputs/transaction.input';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';
import { TransactionProduct } from './entities/transactionProduct.entity';
import { TransactionProductInput } from './inputs/transactionProduct.input';
import { Product } from '../products/product.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>,
        @InjectRepository(TransactionProduct)
        private readonly transactionProductRepository: Repository<TransactionProduct>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find({ relations: ["warehouseOrigin", "warehouseDestiny", "transactionProducts"], order: { id: "DESC" } })
    }

    async find(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne(id, { relations: ["warehouseOrigin", "warehouseDestiny", "transactionProducts"] })
    }

    async create(input: TransactionInput): Promise<Transaction> {
        let transaction: Transaction = await this.transactionRepository.create(input)
        let warehouseOrigin = await this.warehouseRepository.findOne({ id: input.warehouseOriginId })
        let warehouseDestiny = await this.warehouseRepository.findOne({ id: input.warehouseDestinyId })
        transaction.warehouseDestiny = warehouseDestiny
        transaction.warehouseOrigin = warehouseOrigin
        await this.transactionRepository.save(transaction)
        return transaction
    }

    async update(id: number, input: TransactionInput): Promise<Transaction> {
        let transaction: Transaction = await this.transactionRepository.findOne(id, { relations: ["warehouseOrigin", "warehouseDestiny"] })
        if (!transaction)
            throw new HttpException('Transaction Not Found', HttpStatus.NOT_FOUND);
        await this.transactionRepository.update({ id }, { ...input })
        return transaction
    }

    async delete(id: number): Promise<Transaction> {
        let transaction: Transaction = await this.transactionRepository.findOne(id)
        if (!transaction)
            throw new HttpException('Transaction Not Found', HttpStatus.NOT_FOUND);
        await this.transactionRepository.remove(transaction)
        return null
    }

    async addProduct(input: TransactionProductInput): Promise<TransactionProduct> {
        let transaction: Transaction = await this.transactionRepository
            .findOne({ id: input.transactionId }, { relations: ["transactionProducts"] })
        if (!transaction)
            throw new HttpException('Transaction Not Found', HttpStatus.NOT_FOUND);
        let tP: TransactionProduct = await this.transactionProductRepository
            .findOne({ transactionId: input.transactionId, productId: input.productId })
        if (tP)
            throw new HttpException('El producto ya ha sido agregado', HttpStatus.NOT_MODIFIED);
        const transactionProduct: TransactionProduct = await this.transactionProductRepository.create(input)
        transaction.transactionProducts = [...transaction.transactionProducts, transactionProduct]
        await this.transactionProductRepository.save(transactionProduct)
        const product: Product = await this.productRepository.findOne({ id: input.productId })
        transactionProduct.product = product
        return transactionProduct
    }

    async removeProduct(productId: number, transactionId: number) {
        let transactionProduct: TransactionProduct = await this.transactionProductRepository
            .findOne({ transactionId, productId })
        if (!transactionProduct)
            throw new HttpException('Product Transaction Not Found', HttpStatus.NOT_FOUND);
        await this.transactionProductRepository.remove(transactionProduct)
        return null
    }
}
