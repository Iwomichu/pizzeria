//var express = require("express");
import * as express from "express";
const pool = require("./../../bin/db.js");

let indexRouter: express.Router = express.Router();

indexRouter.get("/", function(req:express.Request, res:express.Response){
    console.log("Got a index request :3");
    res.status(200).render("home",{title: "Home | Main"});
    // ZAPYTANIE DO BAZY //
    pool.query("SELECT * FROM users;",(err: any,res: any)=>{
        console.log(res);
    });
});

export {indexRouter};