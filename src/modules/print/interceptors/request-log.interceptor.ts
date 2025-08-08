
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AppUsageInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const url = req.user?.url;
        const name = req.user?.name;
        const method = req.method;
        const path = req.route?.path || req.url;

        const now = Date.now();

        return next.handle().pipe(
            tap(() => {
                console.log(`[${url}--${name}] ${method} ${path} - ${Date.now() - now}ms`);
            }),
        );
    }
}
