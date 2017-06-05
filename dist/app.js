"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const handlebars = require("express-handlebars");
const hbs = require("hbs");
let app = express();
const index_1 = require("./routers/index");
const products_1 = require("./routers/products");
const contact_1 = require("./routers/contact");
const about_1 = require("./routers/about");
const register_1 = require("./routers/register");
const login_1 = require("./routers/login");
const sandbox_1 = require("./routers/sandbox");
const faktura_1 = require("./routers/faktura");
const errorRequest_1 = require("./routers/errorRequest");
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
app.use("/login", login_1.router);
app.use("/sandbox", sandbox_1.router);
app.use("/faktura", faktura_1.router);
app.use("/*", errorRequest_1.router);
module.exports = app;
