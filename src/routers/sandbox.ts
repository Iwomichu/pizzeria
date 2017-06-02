import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import * as nodemailer from "nodemailer";
import {StringDecoder} from "string_decoder";
import {transporter} from "./../mail";
import {PdfHelper} from "./../helperlib";

let router: express.Router = express.Router();
let decoder:any = new StringDecoder();

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    let content:void = fs.readFile("./data/faktura.json", (err, jsondata)=>{
        let jsonContent:JSON = JSON.parse(decoder.write(jsondata));
        PdfHelper.SendMenu(jsonContent, "michal.juralowicz@gmail.com");
    });



    next();
});

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    res.send("HELLO THERE");
});

export {router};