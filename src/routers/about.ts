import * as express from "express";
import {Playground} from "./../coolkidsplayground";
let router: express.Router = express.Router();

router.get("/", (req: express.Request, res: express.Response, next: express.NextFunction)=>{
    console.log("Accessing about us page");
    Playground.Hello();
    res.render("about");
});

export {router};