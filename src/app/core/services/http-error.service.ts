/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

/**
 * Default error handler
 */
@Injectable()
export class ErrorHandler {
    // ErrorObservable when rxjs version < rc.5
    // ErrorObservable<string> when rxjs version = rc.5
    // I'm leaving any for now to avoid breaking apps using both versions
    public handleError(errorResponse: HttpErrorResponse): any {
        return throwError(errorResponse.error || 'Server error');
    }
}
