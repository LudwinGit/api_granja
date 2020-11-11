import { Module } from '@nestjs/common';
import { UnificationsService } from './unifications.service';
import { UnificationsResolver } from './unifications.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unification } from './unification.entity';
import { SalesModule } from '../sales/sales.module';

@Module({
  imports:[TypeOrmModule.forFeature([Unification]),SalesModule],
  providers: [UnificationsService, UnificationsResolver]
})
export class UnificationsModule {}
