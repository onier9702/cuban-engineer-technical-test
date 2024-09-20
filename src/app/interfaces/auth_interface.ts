export interface IAuth {
    uid: number;
    name: string;
    email: string;
    roles: string[];
    token?: string;
}

export interface IAuthToLogin {
    email: string;
    password: string;
}

export interface IAuthToRegister {
    name: string;
    email: string;
    password: string;
}

export interface IAuthToUpdate {
    name?: string;
    password?: string;
    email?: string;
}

export interface IMessage {
    msg: string;
}
