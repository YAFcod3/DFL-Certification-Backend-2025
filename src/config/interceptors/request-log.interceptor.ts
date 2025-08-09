
import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import {AppLogsService} from "../../modules/app-logs/app-logs.service";

const ENDPOINTS_NOT_TO_LOG =[ '/app-logs'];

@Injectable()
export class AppUsageInterceptor implements NestInterceptor {
    constructor(private readonly appUsageService: AppLogsService) {}

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const isExcluded = ENDPOINTS_NOT_TO_LOG.some(endpoint =>
            req.url.includes(endpoint),
        );

        if (isExcluded) {
            return next.handle();
        }
        const url = req.user?.url;
        const name = req.user?.name;
        const method = req.method;
        const path = req.route?.path || req.url;
        // const path =  req.url;

        return next.handle().pipe(
            tap(() => {
                this.appUsageService.create({
                    name,
                    url,
                    method,
                    path
                })
            }),
        );
    }
}
