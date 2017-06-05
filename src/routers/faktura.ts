import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import { StringDecoder } from "string_decoder";
import { transporter } from "./../mail";
import * as PdfHelper from "./../helperlib";

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
        email: "michal.juralowicz@gmail.com",
        jsonData: jsonContent,
        mailText: "faktura",
        pdfFilename: "faktura.pdf",
        save: true,
        send: true,
        subject: "Faktura"
    });

    res.send("HI!@#@");
});

export {router};