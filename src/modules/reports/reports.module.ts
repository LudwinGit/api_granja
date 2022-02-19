import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/product.entity';
import { ReportsResolver } from './reports.resolver';
import { ReportsService } from './reports.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([Product])
  ],
  providers: [ReportsResolver, ReportsService]
})
export class ReportsModule {}
