import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";
import * as path from "path";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";

interface PdfHelperOptions{
    mainTemplateFilename? :string;
    jsonData: JSON;
    email: string;
    subject?: string;
    headerTemplateFilename?: string;
    footerTemplateFilename?: string;
    logoFilename?: string;
    cssFilename?: string;
    mailText?: string;
    pdfFilename?: string;
}

export class PdfHelper {
    mainTemplateFilename :string;
    jsonData: JSON;
    email: string;
    subject: string;
    headerTemplateFilename: string;
    footerTemplateFilename: string;
    logoFilename: string;
    cssFilename: string;
    mailText: string;
    pdfFilename: string;

    constructor(options: PdfHelperOptions){
        this.mainTemplateFilename = options.mainTemplateFilename || "sandbox.handlebars";
        this.jsonData = options.jsonData;
        this.email = options.email;
        this.subject = options.subject || "Faktura";
        this.headerTemplateFilename = options.headerTemplateFilename || "header.handlebars";
        this.footerTemplateFilename = options.footerTemplateFilename || "footer.handlebars";
        this.logoFilename = options.logoFilename || "logo.png";
        this.cssFilename = options.cssFilename || "pdf-style.css";
        this.mailText = options.mailText || "";
        this.pdfFilename = options.mailText || "faktura.pdf";
    };
    public static SendMenu = async function (jsonRaw: JSON, email: string, subject: string = "Faktura") {
        let data: string = await fs.readFile(path.join(".", "views", "sandbox.handlebars"), "utf-8");
        let template = await PdfHelper.CompileTemplate(data);
        let templateReady = await PdfHelper.Merge(template, jsonRaw);

        let header = await fs.readFile(path.join(".", "views", "header.handlebars"), "utf-8");
        let headerRaw = await PdfHelper.CompileTemplate(header);
        let headerReady = await PdfHelper.Merge(headerRaw, jsonRaw);

        let footer = await fs.readFile(path.join(".", "views", "footer.handlebars"), "utf-8");
        let footerRaw = await PdfHelper.CompileTemplate(footer);
        let footerReady = await PdfHelper.Merge(footerRaw, jsonRaw);

        let css = path.join(`file://`, __dirname, `../views/pdf-style.css`);
        let image = path.join(`file://`, __dirname, `../views/img.jpg`);

        templateReady = await PdfHelper.Replace(templateReady, `{{css}}`, css);
        templateReady = await PdfHelper.Replace(templateReady, `{{image}}`, image);

        let pdfOptions = { 
            height: "297mm", 
            width: "210mm",
            footer:{
                contents: footerReady
            }
        };

        await fs.writeFile("faktura.html", templateReady);

        let helper = await htmlpdf.create(templateReady, pdfOptions);
        let buffer: Buffer = await PdfHelper.ToBuffer(helper);

        let mailOptions = {
            from: '"Pizzeria Penis" <lol@wp.pl>',
            to: email,
            subject: subject,
            text: "sample text",
            attachments: [
                {
                    filename: "faktura.pdf",
                    content: buffer
                }
            ]
        };

        await PdfHelper.SendMail(mailOptions);
    };
    private static CompileTemplate = function (data: string): Promise<HandlebarsTemplateDelegate> {
        return new Promise<HandlebarsTemplateDelegate>((resolve, reject) => {
            try{
                resolve(handlebars.compile(data));
            }
            catch(err){
                reject(err);
            }
        });
    };
    private static Merge = function (template: HandlebarsTemplateDelegate, jsondata: JSON): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            try{
                resolve(template(jsondata));
            }
            catch(err){
                reject(err);
            }
        })
    };
    private static ToBuffer = function (htmldoc: htmlpdf.CreateResult): Promise<Buffer> {
        return new Promise<Buffer>(function (resolve, reject) {
            htmldoc.toBuffer((err, buffer) => {
                if (err) reject(err);
                else resolve(buffer);
            })
        });
    };
    private static SendMail = function (options:object):Promise<void>{
        return new Promise<void>(function(resolve, reject){
            transporter.sendMail(options, (err, info)=>{
                console.log("Message %s sent %s", info.messageId, info.response);
                if(err) reject(err);
                else resolve()
            });
            
        })
    };
    private static Replace = function(originalTemplate: string, target: string,source: string):Promise<string>{
        return new Promise<string>((resolve, reject)=>{
            try{
                resolve(originalTemplate.replace(target, source))
            }
            catch(err){
                reject(err);
            }
        })
    }
    public CreatePdfHelper = function(options:PdfHelperOptions){
        return new PdfHelper(options);
    }
}