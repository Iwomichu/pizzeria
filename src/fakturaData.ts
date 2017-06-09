import { Utilities } from "./util";

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

export class Podatek {
    constructor(_vat: number) {
        this.vat = _vat;
        this.netto = 0;
        this.kwotaVat = 0;
        this.brutto = 0;
    }

    vat: number | string;
    netto: number;
    kwotaVat: number;
    brutto: number;

    sum() {
        if (typeof this.vat == "number")
            this.kwotaVat = (this.netto * this.vat) / 100;
        else
            this.kwotaVat = (this.netto * 0) / 100;
        this.brutto = this.netto + this.kwotaVat;
    }
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
    slownie: string;
    sumaString: string;
    vatString: string;
    nettoString: string;
    podatki: Podatek[];
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

    public sumowanie() {
        console.log("Here :3");
        let self = this;
        let sum: number = 0;
        let sumV = 0;
        let sumN = 0;

        self.podatki = [];
        self.podatki[0] = new Podatek(23);
        self.podatki[1] = new Podatek(8);
        self.podatki[2] = new Podatek(5);
        self.podatki[3] = new Podatek(0);
        self.podatki[4] = new Podatek(0);
        console.log("Here :3");

        for (let item of this.przedmioty) {
            item.netto = item.ilosc * item.cenajedn;
            item.kwotaVat = (item.netto * item.vat) / 100;
            item.brutto = item.netto + item.kwotaVat;
            sum += item.brutto;
            sumV += item.kwotaVat;
            sumN += item.netto;

            switch (item.vat) {
                case 23:
                    self.podatki[0].netto += item.netto;
                    break;
                case 8:
                    self.podatki[1].netto += item.netto;
                    break;
                case 5:
                    self.podatki[2].netto += item.netto;
                    break;
                case 0:
                    self.podatki[3].netto += item.netto;
                    break;
                default:
                    self.podatki[4].netto += item.netto;
                    break;
            }
        }
        for(let i = 0; i < 5; i++){
            this.podatki[i].sum();
        }
        self.sumaString = sum.toFixed(2);
        self.vatString = sumV.toFixed(2);
        self.nettoString = sumN.toFixed(2);
        self.slownie = Utilities.kwotaSlownie(Math.floor(sum)) + "zl " + (multiplyByTen(sum, 2) % 100) + "/100";
        

    }
}

export function multiplyByTen(liczba: number, pow: number): number {
    let result: number;
    let decimals = 0;
    let isdecimal = false;
    let helper: string = liczba.toPrecision();
    let helper2: string = "";
    for (let i = 0; i < helper.length; i++) {
        if (helper[i] == ".") {
            isdecimal = true;
            continue;
        }
        if (isdecimal) {
            decimals++;
        }
        helper2 += helper[i];
    }
    for (let i = 0; i < decimals; i++) {
        helper2 += "0";
    }
    result = parseFloat(helper2);
    return result;
}