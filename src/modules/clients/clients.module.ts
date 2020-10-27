import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsResolver } from './clients.resolver';
import { Client } from './client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports: [TypeOrmModule.forFeature([Client]), RoutesModule],
  providers: [ClientsService, ClientsResolver],
  exports: [ClientsService]
})
export class ClientsModule { }
