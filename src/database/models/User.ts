import {Validator} from "./Validator";
export class User{
    id: number;
    login: string;
    password: string;
    permissions: number;   
    email: string;
    // additionalInfo: boolean;
    name?: string;
    lastname?: string;
    city?: string;
    street?: string;
    address?: number;
    flat?: number;
    phone?: string;
    constructor(req: userI){
        try{
            let validator = new Validator();
            this.login = validator.withoutSpecialSigns(req.login, "login", "Login can contain only a-Z and 0-9.");
            this.password = req.password;
            validator.areEqual(req.password, req["password-re"],'passwordRe', "Passwords are not same");
            this.permissions = req.permissions || 0;
            this.email = validator.isEmail(req.email, "email", "E-mail is not correct");
            if(req.name) this.name = validator.withoutSpecialSigns(req.name, "name", "Name can contain only a-Z and 0-9.");
            if(req.lastname) this.lastname = validator.withoutSpecialSigns(req.lastname, "lastname", "Lastname can contain only a-Z and 0-9.");
            if(req.city) this.city = validator.withoutSpecialSigns(req.city, "city", "City can contain only a-Z and 0-9.");
            if(req.street) this.street = validator.withoutSpecialSigns(req.street, "street", "Street can contain only a-Z and 0-9.");
            if(req.address) this.address = validator.isNumber(req.address, "address", "Addres is not a number");
            if(req.flat) this.flat = validator.isNumber(req.flat, "flat", "Flat is not a number");
            if(req.phone) this.phone = req.phone;
            if(validator.problems)throw validator.problems;
        }
        catch(err){
            return err;
        }
    }
}
export interface userI{
    id: number;
    login: string;
    password: string;
    ["password-re"]: string;
    permissions: number;
    email: string;
    // additionalInfo: boolean;
    name?: string;
    lastname?: string;
    city?: string;
    street?: string;
    address?: number;
    flat?: number;
    phone?: string;
}