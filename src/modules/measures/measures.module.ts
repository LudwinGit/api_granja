import { Module } from '@nestjs/common';
import { MeasuresService } from './measures.service';
import { MeasuresResolver } from './measures.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Measure } from './measure.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Measure])],
  providers: [MeasuresService, MeasuresResolver],
  exports: [MeasuresService]
})
export class MeasuresModule {}
