import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { LoadingBarService } from '../../shared/components/loading-bar/loading-bar.service';

let requestCount = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingBarService);

    if (requestCount === 0) {
        loadingService.show(); // Show the loading indicator only if there are no active requests
    }

    requestCount++;

    return next(req).pipe(
        finalize(() => {
            requestCount--;
            if (requestCount === 0) {
                loadingService.hide(); // Hide the loading bar only when all requests are done
            }
        })
    );
};