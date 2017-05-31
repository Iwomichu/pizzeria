"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
exports.router = router;
router.use("*", (req, res) => {
    console.log("404 response");
    res.status(404).send("404 <br/> No page found.");
});
