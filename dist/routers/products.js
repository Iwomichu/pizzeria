"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const fs = require("fs");
const string_decoder_1 = require("string_decoder");
let router = express.Router();
exports.router = router;
let decoder = new string_decoder_1.StringDecoder();
router.all("/", (req, res, next) => {
    console.log("Someone is accessing our products");
    next();
});
router.get("/", (req, res) => {
    console.log("Products site");
    let content = fs.readFileSync("./data/sample.json");
    let jsonContent = JSON.parse(decoder.write(content));
    console.log(jsonContent);
    res.render("products", jsonContent);
});
router.get("/all", (req, res) => {
    console.log("All products");
    res.status(200).send("These are our products. Enjoy :^)");
});
router.get("/sport", (req, res) => {
    console.log("Sport products");
    res.status(200).send("These are our sport themed products. Stay fit ^^");
});
