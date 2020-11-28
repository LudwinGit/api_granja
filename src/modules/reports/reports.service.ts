import { Injectable } from '@nestjs/common';
import { ProductSale } from './type/productSale';

@Injectable()
export class ReportsService {

    async salesByDates():Promise<ProductSale[]>{
        return null
    }
}
