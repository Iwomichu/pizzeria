import * as express from "express";

let indexRouter: express.Router = express.Router();

indexRouter.get("/", function(req:express.Request, res:express.Response){
    console.log("Got a index request :3");
    res.status(200).render("home",{title: "Home | Main"});
});

export {indexRouter};