export interface CreateUserInput {
    email:string,
    name:string,
    password:string,
    role:USER_ROLES
}

export interface LoginInput {
    email:string,
    password:string
}

export interface UserOutput {
    token:string
}

export enum USER_ROLES {
    "NORMAL" = "NORMAL",
    "ADMIN" = "ADMIN"
}

export class User {
    constructor(
        private id:string,
        private name:string,
        private email:string,
        private password:string,
        private role:USER_ROLES
    ){}

    public getId = ():string => this.id
    public getName = ():string => this.name
    public getEmail = ():String => this.email
    public getPassword = ():string => this.password
    public getRole = ():USER_ROLES => this.role
}
