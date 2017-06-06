"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
let router = express.Router();
exports.router = router;
router.use("/500", (req, res) => {
    console.log("500 response, Something goes wrong.", req.baseUrl);
    res.status(500).send("500 <br/> Some problem with server.");
});
router.use("*", (req, res) => {
    console.log("404 response, \"%s\" page not found", req.baseUrl);
    res.status(404).send("404 <br/> No page found.");
});
