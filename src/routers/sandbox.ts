import * as express from "express";
import * as handlebars from "handlebars";
import * as fs from "fs-extra";
import * as path from "path";

let router: express.Router = express.Router();

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    
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