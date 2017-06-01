import * as express from "express";
import {DatabaseCommunication} from "./../db"
import {User} from "./../database/models/User"

let router: express.Router = express.Router();

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Accessing register page");
    res.render("register");
});

router.post("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Accessing register page");
    
   DatabaseCommunication.connect()
        .then((db) => {DatabaseCommunication.insertOne(db, "users", req.body)
            .then((db) => {DatabaseCommunication.dbClose(db)})
            })
        .catch((err) => {console.error(err)});
    res.send(req.body);
});
export {router};