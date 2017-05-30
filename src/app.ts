import * as express from "express";

let app:express.Application = express();


import {indexRouter} from "./routers/index";
import {router as productsRouter} from "./routers/products";
import {router as errorRequest} from "./routers/errorRequest";

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("", errorRequest);

module.exports = app;