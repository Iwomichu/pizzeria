import * as express from "express";

const handlebars = require("express-handlebars");
const hbs = require("hbs");

let app:express.Application = express();


import {indexRouter} from "./routers/index";
import {router as productsRouter} from "./routers/products";
import {router as contactRouter} from "./routers/contact";
import {router as errorRequest} from "./routers/errorRequest";

app.engine("handlebars", handlebars({defaultLayout:"layout"}))
app.set("view engine", "handlebars");
hbs.registerPartials(__dirname+"/../views/partials");
app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/contact", contactRouter);
app.use("", errorRequest);

module.exports = app;