import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";
import * as path from "path";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";

export interface PdfHelperConfig {
    mainTemplateFilename?: string;
    headerTemplateFilename?: string;
    footerTemplateFilename?: string;
    logoFilename?: string;
    cssFilename?: string;
}

export interface PdfOptions{
    jsonData: JSON;
    email?: string;
    subject?: string;
    mailText?: string;
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

    constructor(config: PdfHelperConfig) {
        this.mainTemplateFilename = config.mainTemplateFilename || "sandbox.handlebars";
        this.headerTemplateFilename = config.headerTemplateFilename || "header.handlebars";
        this.footerTemplateFilename = config.footerTemplateFilename || "footer.handlebars";
        this.logoFilename = config.logoFilename || "../views/faktura/logo.jpg";
        this.cssFilename = config.cssFilename || "../views/faktura/pdf-style.css";
    };
    public Pdf = async (options: PdfOptions) => {
        let data: string = await fs.readFile(path.join(".", "views", "faktura" , this.mainTemplateFilename), "utf-8");
        let template = await this.CompileTemplate(data);
        let templateReady = await this.Merge(template, options.jsonData);

        let header = await fs.readFile(path.join(".", "views", "faktura" , this.headerTemplateFilename), "utf-8");
        let headerRaw = await this.CompileTemplate(header);
        let headerReady = await this.Merge(headerRaw, options.jsonData);

        let footer = await fs.readFile(path.join(".", "views", "faktura" , this.footerTemplateFilename), "utf-8");
        let footerRaw = await this.CompileTemplate(footer);
        let footerReady = await this.Merge(footerRaw, options.jsonData);
        
        console.log("Read stage complete");

        let css = path.join(`file://`, __dirname, this.cssFilename);
        let image = path.join(`file://`, __dirname, this.logoFilename);

        templateReady = await this.Replace(templateReady, `{{css}}`, css);
        templateReady = await this.Replace(templateReady, `{{image}}`, image);

        let pdfOptions = {
            height: "297mm",
            width: "210mm",
            footer: {
                contents: footerReady
            }
        };

        let helper = await htmlpdf.create(templateReady, pdfOptions);
        let buffer: Buffer = await this.ToBuffer(helper);
        
        console.log("Convert stage complete");

        if(options.save) await this.SavePdf(buffer, options.pdfFilename);
        if(options.send) await this.Mail(options, buffer);
        
        console.log("Final stage complete");
    };
    private CompileTemplate = function (data: string): Promise<HandlebarsTemplateDelegate> {
        return new Promise<HandlebarsTemplateDelegate>((resolve, reject) => {
            try {
                resolve(handlebars.compile(data));
            }
            catch (err) {
                reject(err);
            }
        });
    };
    private Merge = function (template: HandlebarsTemplateDelegate, jsondata: JSON): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(template(jsondata));
            }
            catch (err) {
                reject(err);
            }
        })
    };
    private ToBuffer = function (htmldoc: htmlpdf.CreateResult): Promise<Buffer> {
        return new Promise<Buffer>(function (resolve, reject) {
            htmldoc.toBuffer((err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);
            })
        });
    };
    private SendMail = function (options: object): Promise<void> {
        return new Promise<void>(function (resolve, reject) {
            transporter.sendMail(options, (err, info) => {
                console.log("Message %s sent %s", info.messageId, info.response);
                if (err) reject(err);
                else resolve()
            });

        })
    };
    private Replace = function (originalTemplate: string, target: string, source: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try {
                resolve(originalTemplate.replace(target, source))
            }
            catch (err) {
                reject(err);
            }
        })
    };
    private Mail = async (options:PdfOptions, buffer: Buffer)=>{
        let mailOptions = {
            from: '"Pizzeria Penis" <lol@wp.pl>',
            to: options.email,
            subject: options.subject,
            text: options.mailText,
            attachments: [
                {
                    filename: options.pdfFilename,
                    content: buffer
                }
            ]
        };
        await this.SendMail(mailOptions);
    };
    private SavePdf = async (buffer: Buffer, filename: string)=>{
        await fs.writeFile(filename, buffer);
    }
}


export function Create(options: PdfHelperConfig) {
    return new PdfHelper(options);
}