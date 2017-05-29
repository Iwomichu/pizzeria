"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
exports.router = router;
router.all("/", function (req, res, next) {
    console.log("Someone is accessing our products");
    next();
});
router.get("/", function (req, res) {
    console.log("Products site");
    res.status(200).send("Products site. ;>");
});
router.get("/all", function (req, res) {
    console.log("All products");
    res.status(200).send("These are our products. Enjoy :^)");
});
router.get("/sport", function (req, res) {
    console.log("Sport products");
    res.status(200).send("These are our sport themed products. Stay fit ^^");
});
