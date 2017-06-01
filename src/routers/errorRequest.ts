import * as express from "express";

let router:express.Router = express.Router();

router.use("*", (req:express.Request, res:express.Response)=>{
    console.log("404 response, \"%s\" page not found", req.baseUrl);
    res.status(404).send("404 <br/> No page found.");
});

export {router};