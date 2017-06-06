import * as express from "express";
import * as cookieParser from "cookie-parser";
import {Playground} from "./../coolkidsplayground";
let router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    console.log("Accessing about us page");
    Playground.Hello();
    res.cookie("wirusy", true);
    res.render("about");
});

export {router};