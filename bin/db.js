var MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://Ajwo:iylijad10@(DNWMU1997%40cluster0-shard-00-00-j4fm3.mongodb.net:27017,cluster0-shard-00-01-j4fm3.mongodb.net:27017,cluster0-shard-00-02-j4fm3.mongodb.net:27017/pizzeria-dev?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin", function(err, db){
    if(err) throw err;

    db.collection("pizzeria").find().toArray(function(err, result){
        if(err) throw err;
        console.log(result);
    });
});

