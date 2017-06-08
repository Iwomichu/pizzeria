import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";
import * as path from "path";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";
import { Utilities } from "./util";

export interface PdfHelperConfig {
    mainTemplateFilename?: string;
    headerTemplateFilename?: string;
    footerTemplateFilename?: string;
    logoFilename?: string;
    cssFilename?: string;
}

export interface PdfOptions {
    subject: string;
    mailText: string;
    pdfFilename: string;

    send: boolean;
    save: boolean;
}

interface Info {
    miejsce: string,
    dataWys: string,
    dataSpr: string,
    zaplata: string,
    termin: string
}

interface Side {
    nazwa: string,
    adres: string,
    zip: string,
    nip: string,
    nrkonta: string
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

class FakturaExtended extends Faktura {
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
    suma: number;

    public sumowanie() {
        let sum: number = 0;
        for (let item of this.przedmioty) {
            sum += item.ilosc * (item.cenajedn * (item.vat / 100) + item.cenajedn);
        }
        this.suma = sum;
        this.slownie = Utilities.kwotaSlownie(Math.floor(sum)) + "zl " + Math.floor((sum * 100) % 100) + "/100";
    }
}

interface Przedmiot {
    nr: number,
    nazwa: string,
    symbol: string,
    jm: string,
    ilosc: number,
    cenajedn: number,
    vat: number
}

export class PdfHelper {
    mainTemplateFilename: string;
    headerTemplateFilename: string;
    footerTemplateFilename: string;
    logoFilename: string;
    cssFilename: string;

    constructor(config: PdfHelperConfig) {
        this.mainTemplateFilename = config.mainTemplateFilename || "sandbox.handlebars";
        this.headerTemplateFilename = config.headerTemplateFilename || "header.handlebars";
        this.footerTemplateFilename = config.footerTemplateFilename || "footer.handlebars";
        this.logoFilename = config.logoFilename || "../views/faktura/logo.jpg";
        this.cssFilename = config.cssFilename || "../views/faktura/pdf-style.css";
    };
    public async pdf(email: string, jsonData: Faktura, options: PdfOptions) {
        let stage = "read";
        console.log(jsonData);
        let newData = new FakturaExtended(jsonData);
        console.log(newData);
        try {



            let data: string = await fs.readFile(path.join(".", "views", "faktura", this.mainTemplateFilename), "utf-8");
            let template = await this.compileTemplate(data);
            let templateReady = await this.merge(template, newData);

            let header = await fs.readFile(path.join(".", "views", "faktura", this.headerTemplateFilename), "utf-8");
            let headerRaw = await this.compileTemplate(header);
            let headerReady = await this.merge(headerRaw, newData);

            let footer = await fs.readFile(path.join(".", "views", "faktura", this.footerTemplateFilename), "utf-8");
            let footerRaw = await this.compileTemplate(footer);
            let footerReady = await this.merge(footerRaw, newData);

            console.log("Read stage complete");
            stage = "convert";
            let css = path.join(`file://`, __dirname, this.cssFilename);
            let image = path.join(`file://`, __dirname, this.logoFilename);

            templateReady = await this.replace(templateReady, `{{css}}`, css);
            templateReady = await this.replace(templateReady, `{{image}}`, image);

            let pdfOptions = {
                height: "297mm",
                width: "210mm",
                footer: {
                    contents: footerReady
                }
            };

            let helper = await htmlpdf.create(templateReady, pdfOptions);
            let buffer: Buffer = await this.toBuffer(helper);

            console.log("Convert stage complete");
            stage = "final";
            if (options.save) this.savePdf(buffer, options.pdfFilename);
            if (options.send) this.mail(email, options, buffer);

            console.log("Final stage complete");
        }
        catch (err) {
            console.log("Error has occured during %s stage", stage);
            console.log(err);
        }

    };
    private compileTemplate(data: string): Promise<HandlebarsTemplateDelegate> {
        return new Promise<HandlebarsTemplateDelegate>((resolve, reject) => {
            try {
                resolve(handlebars.compile(data));
            }
            catch (err) {
                reject(err);
            }
        });
    };
    private merge(template: HandlebarsTemplateDelegate, jsondata: Faktura): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(template(jsondata));
            }
            catch (err) {
                reject(err);
            }
        })
    };
    private toBuffer(htmldoc: htmlpdf.CreateResult): Promise<Buffer> {
        return new Promise<Buffer>(function (resolve, reject) {
            htmldoc.toBuffer((err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);

            })
        });
    };
    private sendMail(options: object): Promise<void> {
        return new Promise<void>(function (resolve, reject) {
            transporter.sendMail(options, (err, info) => {
                console.log("Message %s sent %s", info.messageId, info.response);
                if (err) reject(err);
                else resolve()
            });

        })
    };
    private replace(originalTemplate: string, target: string, source: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(originalTemplate.replace(target, source))
            }
            catch (err) {
                reject(err);
            }
        })
    };
    private async mail(email: string, options: PdfOptions, buffer: Buffer) {
        let mailOptions = {
            from: '"Pizzeria Penis" <lol@wp.pl>',
            to: email,
            subject: options.subject,
            text: options.mailText,
            attachments: [
                {
                    filename: options.pdfFilename,
                    content: buffer
                }
            ]
        };
        await this.sendMail(mailOptions);
    };
    private async savePdf(buffer: Buffer, filename: string) {
        await fs.writeFile(filename, buffer);
    }
}


export function create(options: PdfHelperConfig) {
    return new PdfHelper(options);
}