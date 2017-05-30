"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var string_decoder_1 = require("string_decoder");
var router = express.Router();
exports.router = router;
var decoder = new string_decoder_1.StringDecoder();
router.all("/", function (req, res, next) {
    console.log("Someone is accessing our products");
    next();
});
router.get("/", function (req, res) {
    console.log("Products site");
    var content = fs.readFileSync("./data/sample.json");
    var jsonContent = JSON.parse(decoder.write(content));
    console.log(jsonContent);
    res.render("products", jsonContent);
});
router.get("/all", function (req, res) {
    console.log("All products");
    res.status(200).send("These are our products. Enjoy :^)");
});
router.get("/sport", function (req, res) {
    console.log("Sport products");
    res.status(200).send("These are our sport themed products. Stay fit ^^");
});
