import { MongoClient } from "mongodb";

//MongoClient.connect("mongodb://Ajwo:iylijad10@(DNWMU1997@cluster0-shard-00-00-j4fm3.mongodb.net:27017,cluster0-shard-00-01-j4fm3.mongodb.net:27017,cluster0-shard-00-02-j4fm3.mongodb.net:27017/pizzeria-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", function(err, db){
//console.log("hello from the databaseee");
//db.close();
// if(err) throw err;

// db.collection("pizzeria").find().toArray(function(err, result){
//     if(err) throw err;
//     console.log(result);
// });
//});

export class DatabaseCommunication {
    public static methodError = function (err :Error, result :object,db :any, callback :Function) {
        if(err)return console.error(err);
        callback(result);
        db.close();
    }

    public static connect = function (collection: string, document: object = {}){
           MongoClient.connect("mongodb://localhost:27017/pizzeria").then( (db) =>{
               DatabaseCommunication.insertOne
            // if (err) throw err;
            // console.log("hello from the databaseee");
            // switch (methodName) {
            //     case "insertOne":
            //     console.log(document);
            //         db.collection(collection).insertOne(document, (err, result)=>{DatabaseCommunication.methodError(err, result, db, callback)}).then(db.close);
            //         break;
            // }
            
        }).then( (db) =>{DatabaseCommunication.dbClose}).catch();
    }
    public static insertOne = function(db :any, err: Error, collection: string, document: object = {}): Promise<string> {
            return new Promise<string>(
                (resolve,reject) => {
                    resolve(db.collection(collection).insertOne(document));
                    reject(console.error(err));
                }
            );
    }
     public static dbClose = function(db :any): Promise<string> {
            return new Promise<string>(
                resolve => {
                    resolve(db.close());
                }
            );
    }
    
}