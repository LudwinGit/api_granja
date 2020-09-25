import { Resolver, Query } from '@nestjs/graphql';
import { WarehousesService } from './warehouses.service';
import { WarehouseType } from './models/warehouse.model';

@Resolver()
export class WarehousesResolver {
    constructor(private readonly service:WarehousesService){}
    @Query(() => [WarehouseType])
    async warehouses() {
        return this.service.findAll();
    }
}
