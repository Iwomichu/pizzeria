import * as express from "express";
import * as session from 'express-session';
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";

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

app.use(cookieParser("Sekrecik"));

app.set('trust proxy', 1) 
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({
    secret: 'sssssh! That\'s the secret',
    name: 'session',
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      maxAge: 60 * 60 * 1000,
      expires: new Date(Date.now() + (3 * 60 * 60 * 1000))
    },
    store:new session.MemoryStore()
}));

app.engine("handlebars", handlebars({defaultLayout:"layout"}));
app.set("view engine", "handlebars");
hbs.registerPartials(__dirname+"/../views/partials");
app.use(express.static("public"));
app.use(express.static("bower_components"));

app.use("/", indexRouter);
app.use("/products", productsRouter);
app.use("/contact", contactRouter);
app.use("/about", aboutRouter);
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/sandbox", sandboxRouter);
app.use("/faktura", fakturaRouter);

app.use("/test", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
      res.cookie('name', "value");
      console.log(req.cookies);
      res.send(req.session);
});
app.use("/", errorRequest);
module.exports = app;