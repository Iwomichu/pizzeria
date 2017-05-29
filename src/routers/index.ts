//var express = require("express");
import * as express from "express";

let indexRouter: express.Router = express.Router();

indexRouter.get("/", function(req:express.Request, res:express.Response){
    console.log("Got a index request :3");
    res.status(200).send("You are now in the index area. Have a nice stay :) ");
});

export {indexRouter};