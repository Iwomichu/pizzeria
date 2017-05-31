import * as handlebars from "handlebars";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import * as fs from "fs-extra";

import { StringDecoder } from "string_decoder";
import { transporter } from "./mail";

export class Helper {
    public static SendMenu = function (jsonRaw: JSON, email: string): void {
        fs.readFile("./views/sandbox.handlebars", "utf-8").then(data => {
            Helper.CompileTemplate(data).then(template => {
                Helper.Merge(template, jsonRaw).then(templateReady => {
                    console.log(templateReady);
                    fs.writeFile("test.html", templateReady, function (err) {
                        if (err) return console.log(err);
                    });
                    let helper = htmlpdf.create(templateReady, { format: "Letter" }).toBuffer((err, buffer) => {
                        let mailOptions = {
                            from: '"Pizzeria Penis" <lol@wp.pl>',
                            to: "michal.juralowicz@gmail.com",
                            subject: "OH HELLO THERE",
                            text: "WELP",
                            attachments: [
                                {
                                    filename: "faktura.pdf",
                                    content: buffer
                                }
                            ]
                        };

                        transporter.sendMail(mailOptions, (err, info) => {
                            console.log("Attempting to send the email");
                            if (err) console.log(err);
                            console.log("Message %s sent %s", info.messageId, info.response);
                        });
                    });
                });
            });
        });

    };
    public static CompileTemplate = function (data: string): Promise<HandlebarsTemplateDelegate> {
        return new Promise<HandlebarsTemplateDelegate>(resolve => {
            resolve(handlebars.compile(data));
        });
    };
    public static Merge = function (template: HandlebarsTemplateDelegate, jsondata: JSON): Promise<string> {
        return new Promise<string>(resolve => {
            resolve(template(jsondata));
        })
    }
}