"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var index_1 = require("./routers/index");
var products_1 = require("./routers/products");
app.use("/", index_1.indexRouter);
app.use("/products", products_1.router);
module.exports = app;
