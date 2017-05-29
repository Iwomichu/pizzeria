import * as express from "express";

let app:express.Application = express();
import {indexRouter} from "./routers/index";
import {router as productsRouter} from "./routers/products";

app.use("/", indexRouter);
app.use("/products", productsRouter);

module.exports = app;