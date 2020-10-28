import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoutesService } from '../routes/routes.service';
import { Client } from './client.entity';
import { ClientInput } from './input/client.input';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        private readonly clientRepository: Repository<Client>,
        private readonly routeService: RoutesService
    ) { }

    async findAll(): Promise<Client[]> {
        return await this.clientRepository.find({ relations: ["route"] })
    }

    async find(id: number): Promise<Client> {
        return await this.clientRepository.findOne(id, { relations: ["route"] })
    }

    async findByRoute(routeId: number): Promise<Client[]> {
        return await this.clientRepository.find({ where: { route: routeId }, relations: ["route"] })
    }

    async create(input: ClientInput): Promise<Client> {
        const client = await this.clientRepository.create(input)
        const route = await this.routeService.find(input.routeId)
        client.route = route
        await this.clientRepository.save(client)
        return client
    }

    async update(id: number, input: ClientInput): Promise<Client> {
        const client = await this.clientRepository.findOne(id)
        await this.clientRepository.update(id, {
            name: input.name,
            nit: input.nit,
            address: input.address,
        })
        return client
    }

    async delete(id:number):Promise<Client>
    {
        const client = await this.clientRepository.findOne(id)
        if (!client)
            throw new HttpException('Client Not Found', HttpStatus.NOT_FOUND);
        await this.clientRepository.remove(client)
        return null
    }
}
