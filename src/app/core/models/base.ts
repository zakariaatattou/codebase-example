export interface AccessTokenInterface {
    token: string | null;
    expires?: any;
}

export interface User {
    $id?: string;
    initials?: string;
    email?: string;
    phoneNumber?: string;
    firstName?: any;
    lastName?: string;
    userType?: string;
}



export class Token implements AccessTokenInterface {
    token: string | null = null;
    expires?: any = null;
    constructor(data?: AccessTokenInterface) {
        Object.assign(this, data);
    }
}
