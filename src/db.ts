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

function methodError(err :Error, result :object, callback :Function) {
    if(err)return console.error(err);
    callback(result);
}
function connection(methodName: string, collection: string, document: object = {}, callback : Function = ()=>{}) {
    MongoClient.connect("mongodb://Ajwo:iylijad10%40(DNWMU1997@cluster0-shard-00-00-j4fm3.mongodb.net:27017,cluster0-shard-00-01-j4fm3.mongodb.net:27017,cluster0-shard-00-02-j4fm3.mongodb.net:27017/pizzeria-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", function (err, db) {
        if (err) throw err;
        console.log("hello from the databaseee");
        switch (methodName) {
            case "insertOne":
                db.collection(collection).insertOne(document, (err, result)=>{methodError(err, result, callback)});
                break;
        }
        db.close();
    });
}

export { connection }