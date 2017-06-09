import * as express from "express";
import * as bodyParser from "body-parser";
import * as path from "path";

const handlebars = require("express-handlebars");
const hbs = require("hbs");

let app:express.Application = express();

import {indexRouter} from "./routers/index";
import {router as productsRouter} from "./routers/products";
import {router as contactRouter} from "./routers/contact";
import {router as aboutRouter} from "./routers/about";
import {router as registerRouter} from "./routers/register";
import {router as loginRouter} from "./routers/login";
import {router as sandboxRouter} from "./routers/sandbox";
import {router as fakturaRouter} from "./routers/faktura";
import {router as errorRequest} from "./routers/errorRequest";

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use('/static',express.static(__dirname+'/../bower_components/'));
app.use('/icons',express.static(__dirname+'/../views/icons/'));
//app.use('/register/static/',express.static(__dirname+'/../bower_components/'));
app.engine("handlebars", handlebars({defaultLayout:"layout"}))
app.set("view engine", "handlebars");
hbs.registerPartials(__dirname+"/../views/partials");

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/sandbox", sandboxRouter);
app.use("/faktura", fakturaRouter);

app.use("/", errorRequest);

module.exports = app;