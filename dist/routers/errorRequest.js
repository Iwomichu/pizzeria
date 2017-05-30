"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
exports.router = router;
router.use("*", function (req, res) {
    console.log("404 response");
    res.status(404).send("404 <br/> No page found.");
});
