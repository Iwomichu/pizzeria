import * as express from "express";

let router: express.Router = express.Router();

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Accessing register page");
    res.render("register");
});

export {router};