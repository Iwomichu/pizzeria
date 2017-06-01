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
        .then((db) => {DatabaseCommunication.insertOne(db, "users", req.body, false, (result: any)=>{
                            DatabaseCommunication.findOne(db, "users", {login: result.ops[0].login} , true, (result: any)=>{  
                                console.log(result);   
                                res.redirect("/register/success/"+result.name+"/"+result.lastname);
                            })
                        })
    }).catch((err) => {console.error(err)});
});

router.get("/success/:name?/:lastname?", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    if(req.params.name && req.params.lastname)console.log("%s %s successfuly registed", req.params.name, req.params.lastname);
    else console.log("Somebody successfuly registed");
    res.send("Rejestracja udana");
});

export {router};