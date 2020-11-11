import { Module } from '@nestjs/common';
import { UnificationproductService } from './unificationproduct.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnificationProduct } from './unificationproduct.entity';

@Module({
  imports:[TypeOrmModule.forFeature([UnificationProduct])],
  providers: [UnificationproductService]
})
export class UnificationproductModule {}
