import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { TransactionInput } from './inputs/transaction.input';
import { Warehouse } from '../warehouses/entitys/warehouse.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private readonly transactionRepository: Repository<Transaction>,
        @InjectRepository(Warehouse)
        private readonly warehouseRepository: Repository<Warehouse>
    ) { }

    async findAll(): Promise<Transaction[]> {
        return await this.transactionRepository.find({relations:["warehouseOrigin","warehouseDestiny"],order:{id:"DESC"}})
    }

    async find(id: number): Promise<Transaction> {
        return await this.transactionRepository.findOne(id,{relations:["warehouseOrigin","warehouseDestiny"]})
    }

    async create(input: TransactionInput): Promise<Transaction> {
        let transaction: Transaction = await this.transactionRepository.create(input)
        let warehouseOrigin = await this.warehouseRepository.findOne({id:input.warehouseOriginId})
        let warehouseDestiny = await this.warehouseRepository.findOne({id:input.warehouseDestinyId})
        transaction.warehouseDestiny = warehouseDestiny
        transaction.warehouseOrigin = warehouseOrigin
        await this.transactionRepository.save(transaction)
        return transaction
    }

    async update(id: number, input: TransactionInput): Promise<Transaction> {
        let transaction: Transaction = await this.transactionRepository.findOne(id,{relations:["warehouseOrigin","warehouseDestiny"]})
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
}
