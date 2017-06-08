import {Utilities} from "./util";

export interface Info {
    miejsce: string,
    dataWys: string,
    dataSpr: string,
    zaplata: string,
    termin: string
}

export interface Side {
    nazwa: string,
    adres: string,
    zip: string,
    nip: string,
    nrkonta: string
}

export class Przedmiot {
    nr: number;
    nazwa: string;
    symbol: string;
    jm: string;
    ilosc: number;
    cenajedn: number;
    vat: number;
    netto: number;
    kwotaVat: number;
    brutto: number;
}

export class Faktura {
    filename: string;
    podpis: string;
    str: number;
    nr: string;
    info: Info;
    sprzedawca: Side;
    nabywca: Side;
    przedmioty: Przedmiot[];
}

export class FakturaExtended extends Faktura {
    constructor(orig: Faktura) {
        super();
        this.extend(orig);
    }
    extend(orig: Faktura) {
        this.filename = orig.filename;
        this.podpis = orig.podpis;
        this.str = orig.str;
        this.nr = orig.nr;
        this.info = orig.info;
        this.sprzedawca = orig.sprzedawca;
        this.nabywca = orig.nabywca;
        this.przedmioty = orig.przedmioty;
        this.sumowanie();
    }
    slownie: string;
    sumaString: string;

    public sumowanie() {
        let sum: number = 0;
        for (let item of this.przedmioty) {
            item.netto = item.ilosc*item.cenajedn;
            item.kwotaVat = (item.netto * item.vat)/100;
            item.brutto = item.netto + item.kwotaVat;
            sum += item.brutto;
            
        }
        this.sumaString = sum.toFixed(2) + " zl";
        this.slownie = Utilities.kwotaSlownie(Math.floor(sum)) + "zl " + (multiplyByTen(sum,2)%100) + "/100";
        
        
    }
}

export function multiplyByTen(liczba: number, pow:number):number{
    let result: number;
    let decimals = 0;
    let isdecimal = false;
    let helper: string = liczba.toPrecision();
    let helper2: string = "";
    for(let i = 0; i < helper.length; i++){
        if(helper[i]=="."){
            isdecimal = true;
            continue;
        }
        if(isdecimal){
            decimals++;
        }
        helper2+=helper[i];
    }
    for(let i = 0; i < decimals; i++){
        helper2+="0";
    }
    result = parseFloat(helper2);
    return result;
}