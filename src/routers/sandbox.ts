import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import { StringDecoder } from "string_decoder";
import { transporter } from "./../mail";
import * as PdfHelper from "./../pdf";

let router: express.Router = express.Router();
let pdf: PdfHelper.PdfHelper = PdfHelper.Create({});
let decoder: any = new StringDecoder();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

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
    next();
});

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.send("HELLO THERE");
});

router.post("/", (req: express.Request, res: express.Response)=>{
    console.log(req.body);
    res.send("response");
});

export { router };