import { Module } from '@nestjs/common';
import { ConsolidateService } from './consolidate.service';
import { ConsolidateResolver } from './consolidate.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consolidate } from './entities/consolidate.entity';
import { ConsolidateProduct } from './entities/consolidateProduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Consolidate,ConsolidateProduct])],
  providers: [ConsolidateResolver, ConsolidateService]
})
export class ConsolidateModule {}