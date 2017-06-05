import * as express from "express";
import {DatabaseCommunication} from "./../mongodb"
import {User} from "./../database/models/User"

let router: express.Router = express.Router();

router.post("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
     
   DatabaseCommunication.connect()
        .then((db) => {DatabaseCommunication.findOne(db, "users", {login: req.body.login} , true, (result: any)=>{ 
                                if(result && req.body.password == result.password)res.send("Logged");
                                else res.send("Wrong login or password");
                            })
    }).catch((err) => {console.error(err)});
});

export {router};