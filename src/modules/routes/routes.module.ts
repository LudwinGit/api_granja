import { Module } from '@nestjs/common';
import { RoutesResolver } from './routes.resolver';
import { RoutesService } from './routes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Client } from '../clients/client.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Route,Client])],
  providers: [RoutesResolver, RoutesService],
  exports: [RoutesService]
})
export class RoutesModule {}
