import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";
import * as path from "path";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";
import { Utilities } from "./util";
import {Faktura, FakturaExtended} from "./fakturaData";

export interface PdfHelperConfig {
    mainTemplateFilename?: string;
    headerTemplateFilename?: string;
    footerTemplateFilename?: string;
    logoFilename?: string;
    cssFilename?: string;
    fontFilename?: string;
}

export interface PdfOptions {
    subject: string;
    mailText: string;
    pdfFilename: string;

    send: boolean;
    save: boolean;
}

export class PdfHelper {
    mainTemplateFilename: string;
    headerTemplateFilename: string;
    footerTemplateFilename: string;
    logoFilename: string;
    cssFilename: string;
    fontFilename: string;

    constructor(config: PdfHelperConfig) {
        this.mainTemplateFilename = config.mainTemplateFilename || "sandbox.handlebars";
        this.headerTemplateFilename = config.headerTemplateFilename || "header.handlebars";
        this.footerTemplateFilename = config.footerTemplateFilename || "footer.handlebars";
        this.logoFilename = config.logoFilename || "../views/faktura/logo.png";
        this.cssFilename = config.cssFilename || "../views/faktura/pdf-style.css";
        this.fontFilename = config.fontFilename || "../views/faktura/Lora-Regular.otf"
    };
    public async pdf(email: string, jsonData: Faktura, options: PdfOptions) {
        let stage = "read";
        let newData = new FakturaExtended(jsonData);
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
            let font = path.join(`file://`, __dirname, this.fontFilename);

            templateReady = await this.replace(templateReady, `{{css}}`, css);
            templateReady = await this.replace(templateReady, `{{image}}`, image);
            footerReady = await this.replace(footerReady, `{{image}}`, image);
            templateReady = await this.replace(templateReady, `{{font}}`, font);

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