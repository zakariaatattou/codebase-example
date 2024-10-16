/* tslint:disable */
import { Injectable, Inject, Optional } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams, HttpResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { filter, map, catchError, retry, retryWhen, delay, take, finalize, last, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandler } from './http-error.service';
import { UserService } from './user.service';
import { MessageService } from 'primeng/api';
// Making Sure EventSource Type is available to avoid compilation issues.
declare var EventSource: any;

@Injectable()
export abstract class BaseService {

    protected path: string;
    protected model: any;
    progress$ = new BehaviorSubject(0);
    private _messageService = Inject(MessageService)
    constructor(
        @Inject(HttpClient) protected http: HttpClient,
        @Inject(UserService) protected userService: UserService,
        @Inject(Router) protected router: Router,
        @Optional() @Inject(ErrorHandler) protected errorHandler: ErrorHandler) {
    }

    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    public request(
        method: string,
        url: string,
        routeParams: any = {},
        urlParams: any = {},
        postBody: any = {},
        customHeaders: any = {}
    ): Observable<any> {
        // // Path Params
        // // Transpile route variables to the actual request Values
        // Object.keys(routeParams).forEach((key: string) => {
        //   url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1")
        // });

        // Headers
        let headers: HttpHeaders = new HttpHeaders();

        // Authenticate request
        if (!customHeaders.Authorization)
            headers = this.authenticate(url, headers);

        // Add Language Header to the request
        headers = headers.append('lang', 'en');
        headers = headers.append('Access-Control-Allow-Credentials', 'true');
        headers = headers.append('Access-Control-Allow-Origin', '*')
        headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE, PATCH');
        Object.keys(customHeaders).forEach((header: string) => {
            if (customHeaders[header] !== 'attachment')
                headers = headers.append(header, customHeaders[header]);
        });
        if (!customHeaders['content-type'] && customHeaders['content-type'] !== 'attachment')
            headers = headers.append('content-type', 'application/json');

        // Body
        let body: any;
        body = postBody;


        // URL Params
        let httpParams = new HttpParams();
        if (urlParams)
            Object.keys(urlParams).forEach(paramKey => {
                let paramValue = urlParams[paramKey];
                if (paramValue != null && paramValue != undefined) {
                    paramValue = typeof paramValue === 'object' ? JSON.stringify(paramValue) : paramValue;
                    httpParams = httpParams.append(paramKey, paramValue);
                }
            });

        // Send Request
        let request = new HttpRequest(method, url, body, {
            headers: headers,
            responseType: customHeaders['content-type'] === 'attachment' ? 'blob' : 'json',
            reportProgress: customHeaders['content-type'] === 'attachment' ? true : false,
            params: httpParams,
            withCredentials: true
        });

        return this.http.request(request).pipe(
            filter((event): event is HttpResponse<any> => event instanceof HttpResponse),
            map((res: HttpResponse<any>) => res.body),
            catchError((e) => {
                switch (e.status) {

                    case 401:
                        this.userService.clear();
                        this.router.navigate(['/auth/login']);
                        break;
                    default:
                }
                return throwError(e.error || 'Server error');
            })
        );
    }

    // private getEventMessage(event: HttpEvent<any>) {
    //     if (event.type === HttpEventType.UploadProgress)
    //         return Math.round((100 * event.loaded) / event.total);

    //     return 0;
    // }

    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    public authenticate<T>(url: string, headers: HttpHeaders): HttpHeaders {
        if (this.userService.getAccessTokenId()) {
            headers = headers.append(
                'Authorization',
                `Bearer ${this.userService.getAccessTokenId()}`
            );

        }
        return headers;
    }
}
