import * as express from "express";
import * as handlebars from "express-handlebars";

let app:express.Application = express();


import {indexRouter} from "./routers/index";
import {router as productsRouter} from "./routers/products";

app.set("view engine", "hbs");

app.use("/", indexRouter);
app.use("/products", productsRouter);

module.exports = app;