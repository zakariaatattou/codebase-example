/* tslint:disable */
declare var Object: any;
import { Injectable, } from '@angular/core';
import { Router } from '@angular/router';
import { Token, User } from '../models/base';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private token: any = new Token();
    protected prefix: string = '$' + environment.appName.toUpperCase() + '$';

    constructor(private router: Router) {
        this.token.user = this.load('user');
        this.token.token = this.load('token');
    }

    /**
     * This method will update the user information and persist it
     **/
    public setUser(user: User) {
        this.token.user = JSON.stringify(user);
        this.save();
    }

    /**
     * @method setToken
     * @param {Token} token Token or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    public setToken(token: Token): void {
        this.token.token = token;
        this.save();
    }

    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    public getToken(): Token {
        return <Token>this.token;
    }

    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    public getAccessTokenId(): string {
        return this.token.token;
    }

    public isAuthenticated(): string | null {
        //return this.token.token && this.token.userId;
        return localStorage.getItem(`${this.prefix}token`) && localStorage.getItem(`${this.prefix}user`)
        // return localStorage.getItem(`${this.prefix}token`);
    }

    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
    **/

    public getCurrentUserId(): any {
        return this.token.user.$id;
    }

    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    public getCurrentUserData(): any {
        return typeof this.token.user === 'string' ? JSON.parse(this.token.user) : this.token.user;
    }

    public getUserInitials(): string {
        const fullName: string = this.getCurrentUserData()?.firstName + " " + this.getCurrentUserData().lastName;
        return fullName.split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase().slice(0, 2);;
    }

    public getCurrentUserClaims(): any {
        return typeof this.token.user === 'string' ? JSON.parse(this.token.user).permissions : this.token.user.permissions;
    }

    public isUserAllowedTo(claim: string): any {
        let userClaims = this.getCurrentUserClaims() || [];
        return userClaims.indexOf(claim) >= 0;
    }

    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     **/
    public save(): boolean {
        this.persist('token', this.token.token);
        this.persist('user', this.token.user);

        return true;
    }

    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    protected load(prop: string) {
        return localStorage.getItem(`${this.prefix}${prop}`);
    }

    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    public clear(): void {
        Object.keys(this.token).forEach((prop: string) => localStorage.removeItem(`${this.prefix}${prop}`));
        this.token = new Token();
        this.token.user = null;
    }

    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    protected persist(prop: string, value: any, expires?: any): void {
        try {
            if (value)
                localStorage.setItem(`${this.prefix}${prop}`, typeof value === 'object' ? JSON.stringify(value) : value);
        } catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    }
}
