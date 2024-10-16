import { Injectable } from '@angular/core';
import { HttpHandlerService } from './http-handler.service';
import { User } from '../models/base';
import { apiRoutes } from '../constants/routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpHandlerService) { }

  validateEmail(email: string): Observable<any> {
    return this._http.post(apiRoutes.validateEmail, {}, { Email: email })
  }

  validateOTP(otp: string, token: string): Observable<any> {
    return this._http.post(apiRoutes.validateOtp, {}, { otp }, { Authorization: "Bearer " + token })
  }

  login(email: string, password: string): Observable<any> {
    return this._http.post(apiRoutes.login, { email, password })
  }

  register(user: User): Observable<any> {
    return this._http.post(apiRoutes.register, user)
  }

  getProfile(): Observable<any> {
    return this._http.get(apiRoutes.getProfile)
  }



}
