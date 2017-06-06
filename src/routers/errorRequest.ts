import * as express from "express";

let router:express.Router = express.Router();

router.use("/500", (req:express.Request, res:express.Response)=>{
    console.log("500 response, Something goes wrong.", req.baseUrl);
    res.status(500).send("500 <br/> Some problem with server.");
});

router.use("*", (req:express.Request, res:express.Response)=>{
    console.log("404 response, \"%s\" page not found", req.baseUrl);
    res.status(404).send("404 <br/> No page found.");
});

export {router};