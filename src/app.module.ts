import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { WarehouseCategoriesModule } from './warehousecategories/warehousecategories.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://localhost/nest',{
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex:true,
    }),
    WarehouseCategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
