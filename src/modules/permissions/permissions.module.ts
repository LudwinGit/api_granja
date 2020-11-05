import { Module } from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import { PermissionsResolver } from './permissions.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from './permission.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Permission])],
  providers: [PermissionsService, PermissionsResolver],
  exports: [PermissionsService]
})
export class PermissionsModule {}
