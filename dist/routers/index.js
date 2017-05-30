"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var express = require("express");
var express = require("express");
var pool = require("./../../bin/db.js");
var indexRouter = express.Router();
exports.indexRouter = indexRouter;
indexRouter.get("/", function (req, res) {
    console.log("Got a index request :3");
    res.status(200).render("home", { title: "Home | Main" });
    pool.query("SELECT * FROM users;", function (err, res) {
        console.log(res);
    });
});
