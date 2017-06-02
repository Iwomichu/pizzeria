import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";
import * as path from "path";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";

export class Helper {
    public static SendMenu = async function (jsonRaw: JSON, email: string, subject: string = "Faktura") {
        let data: string = await fs.readFile(path.join(".", "views", "sandbox.handlebars"), "utf-8");
        let template = await Helper.CompileTemplate(data);
        let templateReady = await Helper.Merge(template, jsonRaw);

        let header = await fs.readFile(path.join(".", "views", "header.handlebars"), "utf-8");
        let headerRaw = await Helper.CompileTemplate(header);
        let headerReady = await Helper.Merge(headerRaw, jsonRaw);

        let footer = await fs.readFile(path.join(".", "views", "footer.handlebars"), "utf-8");
        let footerRaw = await Helper.CompileTemplate(footer);
        let footerReady = await Helper.Merge(footerRaw, jsonRaw);

        let css = path.join(`file://`, __dirname, `../views/pdf-style.css`);
        let image = path.join(`file://`, __dirname, `../views/img.jpg`);

        templateReady = await Helper.Replace(templateReady, `{{css}}`, css);
        templateReady = await Helper.Replace(templateReady, `{{image}}`, image);

        let pdfOptions = { 
            height: "297mm", 
            width: "210mm",
            footer:{
                contents: footerReady
            }
        };

        await fs.writeFile("faktura.html", templateReady);

        let helper = await htmlpdf.create(templateReady, pdfOptions);
        let buffer: Buffer = await Helper.ToBuffer(helper);

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

        await Helper.SendMail(mailOptions);
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
}