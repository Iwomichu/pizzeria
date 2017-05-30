import * as express from "express";
import * as fs from "fs";
import {StringDecoder} from "string_decoder";

let router:express.Router = express.Router();
let decoder:any = new StringDecoder();


router.all("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Someone is accessing our products");
    next();
});

router.get("/", (req:express.Request, res:express.Response)=>{
    console.log("Products site");

    let content:Buffer = fs.readFileSync("./data/sample.json");

    let jsonContent:JSON = JSON.parse(decoder.write(content));
    console.log(jsonContent);

    res.render("products", jsonContent);
});

router.get("/all", (req:express.Request, res:express.Response)=>{
    console.log("All products");
    res.status(200).send("These are our products. Enjoy :^)");
});

router.get("/sport", (req:express.Request, res:express.Response)=>{
    console.log("Sport products");
    res.status(200).send("These are our sport themed products. Stay fit ^^");
});

export {router};