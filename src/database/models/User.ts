export class User{
    id: number;
    login: string;
    password: string;
    permissions: number;
    email: string;
    // additionalInfo: boolean;
    name: string = "";
    lastname: string = "";
    city: string;
    street: string;
    address: number;
    flat: number;
    phone: string;
    constructor(req: user){
        this.login = req.login;
        this.password = req.password;
        this.permissions = req.permissions || 0;
        this.email = req.email;
        this.name = req.name;
        this.lastname = req.lastname;
        this.city = req.city;
        this.street = req.street;
        this.address = req.address;
        this.flat = req.flat;
        this.phone = req.phone;
    }
}
export interface user{
    id: number;
    login: string;
    password: string;
    permissions: number;
    email: string;
    // additionalInfo: boolean;
    name: string;
    lastname: string;
    city: string;
    street: string;
    address: number;
    flat: number;
    phone: string;
}