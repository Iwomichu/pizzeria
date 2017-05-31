import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs";
import * as path from "path";
import * as htmlpdf from "html-pdf";
import {StringDecoder} from "string_decoder";

let router: express.Router = express.Router();
let decoder:any = new StringDecoder();

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{

    let content:Buffer = fs.readFileSync("./data/sample.json");

    let jsonContent:JSON = JSON.parse(decoder.write(content));
    console.log(jsonContent);

    fs.readFile("./views/sandbox.handlebars", "utf-8",(err, data)=>{
        let template: any = handlebars.compile(data);
        let result: any = template(jsonContent);

        // fs.writeFile("test.html", result, function(err){
        //     if(err)return console.log(err);
        // });

        let helper = htmlpdf.create(data, {format: "A4"});
        
    });

    next();
});

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    res.send("HELLO THERE");
});

export {router};