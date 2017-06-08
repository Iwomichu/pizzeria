import * as express from "express";
import * as cookieParser from "cookie-parser";
import {Playground} from "./../coolkidsplayground";
import {Utilities} from "./../util";
let router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    console.log("Accessing about us page");
    Playground.Hello();
    res.cookie("wirusy", true);
    res.render("about");
});

router.post("/", (req, res, next)=>{
    console.log(Utilities.kwotaSlownie(parseInt(req.body.number)));
    res.send("Acknowledged!");
});

export {router};