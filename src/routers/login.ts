import * as express from "express";
import * as expressSession from "express-session";
import {DatabaseCommunication} from "./../mongodb";


let router: express.Router = express.Router();

router.use("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
});

export {router};