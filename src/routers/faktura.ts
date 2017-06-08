import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import { StringDecoder } from "string_decoder";
import { transporter } from "./../mail";
import {Utilities} from "./../util";
import {Faktura} from "./../fakturaData";
import * as PdfHelper from "./../pdf";

let router = express.Router();
let pdf: PdfHelper.PdfHelper = PdfHelper.create({});
let decoder: any = new StringDecoder();

router.get("/", (req, res, err) => {
    res.render("fakturaForm");
});

router.post("/sent", async (req, res, err) => {
    let content: Buffer = await fs.readFile("./data/faktura.json");
    let date = new Date();
    let jsonContent: Faktura = JSON.parse(decoder.write(content));
    await pdf.pdf(Utilities.NormalizeMail(req.body.email),jsonContent, {
        mailText: "Faktura | Pizzeria Penis "+ date.toLocaleDateString(),
        pdfFilename: "faktura.pdf",
        save: (req.body.ispdf == 'on') ? true : false,
        send: (req.body.ismail == 'on') ? true : false,
        subject: req.body.subject || "Faktura | Pizzeria Penis "+ date.toLocaleDateString()
    });

    res.send("HI!@#@");
});

export {router};