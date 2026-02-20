import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MemoryInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const mem = process.memoryUsage();
    console.log(
      `[${new Date().toISOString()}] Heap: ${Math.round(mem.heapUsed / 1024 / 1024)} MB / ${Math.round(mem.heapTotal / 1024 / 1024)} MB`
    );
    return next.handle();
  }
}