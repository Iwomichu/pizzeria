"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//var express = require("express");
var express = require("express");
var indexRouter = express.Router();
exports.indexRouter = indexRouter;
indexRouter.get("/", function (req, res) {
    console.log("Got a index request :3");
    res.status(200).send("You are now in the index area. Have a nice stay :) ");
});
