import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { BaseService } from './http-base.service';
import { environment } from '../../../environments/environment';
import { ErrorHandler } from './http-error.service';


@Injectable({
    providedIn: 'root'
})
export class HttpHandlerService extends BaseService {

    constructor(
        @Inject(HttpClient) protected override http: HttpClient,
        @Inject(UserService) protected override userService: UserService,
        @Inject(Router) protected override router: Router,
        @Optional() @Inject(ErrorHandler) protected override errorHandler: ErrorHandler) {
        super(http, userService, router, errorHandler);
    }

    // Construct URL 
    private getURL(path: string): string {
        //In case path is passed as a full URL.. no need to add server base url
        if (path && (path.includes('http://') || path.includes('https://')))
            return path;
        return environment.serverUrl + path;
    }

    get(path: string, urlParams: any = {}, headers: any = {}): Observable<any> {
        let _method: string = 'GET';
        let result = this.request(_method, this.getURL(path), {}, urlParams, {}, headers);
        return result;
    }

    post(path: string, postBody: any = {}, urlParams: any = {}, headers: any = {}) {
        let _method: string = 'POST';
        let result = this.request(_method, this.getURL(path), {}, urlParams, postBody, headers);
        return result;
    }

    put(path: string, postBody: any = {}, urlParams: any = {}, headers: any = {}) {
        let _method: string = 'PUT';
        let result = this.request(_method, this.getURL(path), {}, urlParams, postBody, headers);
        return result;
    }

    patch(path: string, postBody: any = {}, urlParams: any = {}, headers: any = {}) {
        let _method: string = 'PATCH';
        let result = this.request(_method, this.getURL(path), {}, urlParams, postBody, headers);
        return result;
    }

    delete(path: string, postBody: any = {}, urlParams: any = {}) {
        let _method: string = 'DELETE';
        let result = this.request(_method, this.getURL(path), {}, urlParams, postBody);
        return result;
    }


}
