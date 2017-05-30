export class Place {
    id: number;
    address: string;
    city: string;
    street: string;
    phone: string;

    public constructor(_id: number, _address: string, _city: string, _street: string, _phone: string) {
        this.id = _id;
        this.city = _city;
        this.address = _address;
        this.street = _street;
        this.phone = _phone;
    }
}