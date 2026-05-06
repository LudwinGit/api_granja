import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MemoryInterceptor } from './memory/MemoryInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = process.env.API_PORT || 3000;
  app.useGlobalInterceptors(new MemoryInterceptor());
  await app.listen(port);
}
bootstrap();