import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StrapiService {

  baseURL = 'https://cms.paramej.com';
  constructor(private http:HttpClient) { }

  getStrapiContent(url:string , lang:string, target?:string): Observable<any>{
    const headers = new HttpHeaders().set('Authorization', 'Bearer 7677685cdcbd9c2c748a2895914f88826c0afb548b828bcba655728adda3da26a5775da53e9c899857f75448adea97551482eb121736e171a8c18167abbec811417e05dfcfab66d71d2a323ff5ecc41beab63e64e5c2dc4bdcf57434e7b724916be1050de2920201885e4285a725155ba64cd739e7b5fa1c3c9d9a0c88039a10');
    if (target != undefined) {
      return this.http.get(`${this.baseURL}/api/${url}?locale=${lang}&pagination[limit]=200&${target}`,{headers}).pipe(
        tap(_ => {})
      );
    }else{
      return this.http.get(`${this.baseURL}/api/${url}?locale=${lang}&pagination[limit]=200&populate=*`,{headers}).pipe(
        tap(_ => {})
      );
    }
  }
}
