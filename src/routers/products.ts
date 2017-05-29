import * as express from "express";

let router:express.Router = express.Router();

router.all("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Someone is accessing our products");
    next();
});

router.get("/", (req:express.Request, res:express.Response)=>{
    console.log("Products site");
    res.status(200).send("Products site. ;>");
});

router.get("/all", (req:express.Request, res:express.Response)=>{
    console.log("All products");
    res.status(200).send("These are our products. Enjoy :^)");
});

router.get("/sport", (req:express.Request, res:express.Response)=>{
    console.log("Sport products");
    res.status(200).send("These are our sport themed products. Stay fit ^^");
});

export {router};