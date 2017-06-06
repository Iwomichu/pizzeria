import * as express from "express";
import {DatabaseCommunication} from "./../mongodb"
import {DbCommunication} from "./../db"
import * as sqlite3 from "sqlite3"
import {User} from "./../database/models/User"

let router: express.Router = express.Router();

router.get("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log("Accessing register page");
    res.render("register");
});

router.post("/mongo", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
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

router.get("/mongo/success/:name?/:lastname?", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    if(req.params.name && req.params.lastname)console.log("%s %s successfuly registed", req.params.name, req.params.lastname);
    else console.log("Somebody successfuly registed");
    res.send("Rejestracja udana");
});

 router.post("/", (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    console.log(req.body.password,req.body["password-re"]);
    if(req.body.password != req.body["password-re"])return res.send("Hasła nie są identyczne!");
    let user = new User(req.body);
    console.log(user);
    if(user.id)delete user.id;
    let db = new DbCommunication();
    (async()=>{
        var check = await db.select(["login"], ["users"], "WHERE login = \"" + user.login + "\"");
        if(check[0])return res.send("Login zajęty.");

        var check = await db.select(["email"], ["users"], "WHERE email = \"" + user.email + "\"");
        if(check[0])return res.send("E-mail zajęty.");

        var result = await db.insert("users", user);
        if(result)return res.send("Pomyślnie dodano użytkownika.");

        else return res.redirect('/500');
    })();
    db.close();
});

export {router};