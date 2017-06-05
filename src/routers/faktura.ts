import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import { StringDecoder } from "string_decoder";
import { transporter } from "./../mail";
import {Utilities} from "./../util";
import * as PdfHelper from "./../pdf";

let router = express.Router();
let pdf: PdfHelper.PdfHelper = PdfHelper.Create({});
let decoder: any = new StringDecoder();

router.get("/", (req, res, err) => {
    res.render("fakturaForm");
});

router.post("/sent", async (req, res, err) => {
    let content: Buffer = await fs.readFile("./data/faktura.json");
    
    let jsonContent: JSON = JSON.parse(decoder.write(content));
    pdf.Pdf({
        email: Utilities.NormalizeMail(req.body.email),
        jsonData: jsonContent,
        mailText: "faktura",
        pdfFilename: "faktura.pdf",
        save: (req.body.ispdf == 'on') ? true : false,
        send: (req.body.ismail == 'on') ? true : false,
        subject: "Faktura"
    });

    res.send("HI!@#@");
});

export {router};