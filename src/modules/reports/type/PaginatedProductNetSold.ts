import { ObjectType } from "@nestjs/graphql";
import { ProductNetSold } from './productNetSold';
import { PaginatedResponse } from '../../common/shared/PaginatedResponse';

@ObjectType()
export class PaginatedProductNetSold extends PaginatedResponse(ProductNetSold) {}
