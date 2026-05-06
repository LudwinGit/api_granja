import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { RouteInput } from './input/rote.input';

@Injectable()
export class RoutesService {
    constructor(
        @InjectRepository(Route) private routeRepository: Repository<Route>
    ){}

    async findAll():Promise<Route[]>{
        return await this.routeRepository.find()
    }

    async find(id:number):Promise<Route>{
        return await this.routeRepository.findOne(id)
    }

    async routesWithoutAddingtoSeller(sellerId:number){
        const routes = await
            this.routeRepository
                .createQueryBuilder("route")
                .leftJoinAndSelect("route.sellers", "seller","seller.id=:sellerId",{sellerId})
                .where("seller.id is null")
                .getMany()
        return routes
    }

    async create(input:RouteInput):Promise<Route>{
        input.description = input.description.toUpperCase()
        const route = this.routeRepository.create(input)
        await this.routeRepository.save(route)
        return route 
    }

    async update(id:number,input:RouteInput):Promise<Route>{
        input.description = input.description.toUpperCase()
        const route = this.routeRepository.findOne(id)
        if(!route)
            throw new HttpException('Route Not Found', HttpStatus.NOT_FOUND);
        await this.routeRepository.update(id,{...input})
        return route
    }

    async delete(id:number):Promise<Route>{
        const route = this.routeRepository.findOne(id)
        if(!route)
            throw new HttpException('Route Not Found', HttpStatus.NOT_FOUND);
        await this.routeRepository.delete(id)
        return null
    }
}
