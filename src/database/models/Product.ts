export class Product{
    id: number;
    name: string;
    price: number;

    constructor(_id: number, _name: string, _price: number){
        this.id = _id;
        this.name = _name;
        this.price = _price;
    }
}