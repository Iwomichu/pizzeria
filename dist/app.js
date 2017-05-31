"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var hbs = require("hbs");
var app = express();
var index_1 = require("./routers/index");
var products_1 = require("./routers/products");
var contact_1 = require("./routers/contact");
var about_1 = require("./routers/about");
var register_1 = require("./routers/register");
var sandbox_1 = require("./routers/sandbox");
var errorRequest_1 = require("./routers/errorRequest");
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));
app.engine("handlebars", handlebars({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");
hbs.registerPartials(__dirname + "/../views/partials");
app.use(express.static("public"));
app.use(express.static("bower_components"));
app.use("/", index_1.indexRouter);
app.use("/products", products_1.router);
app.use("/contact", contact_1.router);
app.use("/about", about_1.router);
app.use("/register", register_1.router);
app.use("/sandbox", sandbox_1.router);
app.use("/*", errorRequest_1.router);
module.exports = app;
