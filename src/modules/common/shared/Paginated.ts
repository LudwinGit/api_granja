import { ObjectType } from "@nestjs/graphql";
import { WarehouseProduct } from "src/modules/warehouses/entitys/warehouseProduct.entity";
import { PaginatedResponse } from "./PaginatedResponse";

@ObjectType()
export class PaginatedWarehouseProduct extends PaginatedResponse(WarehouseProduct) { }