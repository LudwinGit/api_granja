import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaleReturn } from './entities/sale-return.entity';
import { SaleReturnProduct } from './entities/sale-return-product.entity';
import { SalereturnService } from './salereturn.service';
import { SalereturnResolver } from './salereturn.resolver';
import { MeasuresModule } from '../measures/measures.module';
import { SalesModule } from '../sales/sales.module';
import { WarehouseproductModule } from '../warehouseproduct/warehouseproduct.module';
import { ProductsModule } from '../products/products.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([SaleReturn, SaleReturnProduct]),
        SaleReturnsModule, SalesModule, MeasuresModule, WarehouseproductModule, ProductsModule
    ],
    exports: [SalereturnService],
    providers: [SalereturnService, SalereturnResolver],
})
export class SaleReturnsModule { }