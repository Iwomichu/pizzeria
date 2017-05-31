import { MongoClient } from "mongodb";

// export class DatabaseCommunication {
//     public static methodError = function (err :Error, result :object,db :any, callback :Function) {
//         if(err)return console.error(err);
//         callback(result);
//         db.close();
//     }

//     public static connect = function (collection: string, document: object){
        
//                console.log("0", document);
//            MongoClient.connect("mongodb://localhost:27017/pizzeria").then( (db) =>{
//                console.log("1", document);
//                DatabaseCommunication.insertOne
//             // if (err) throw err;
//             // console.log("hello from the databaseee");
//             // switch (methodName) {
//             //     case "insertOne":
//             //     console.log(document);
//             //         db.collection(collection).insertOne(document, (err, result)=>{DatabaseCommunication.methodError(err, result, db, callback)}).then(db.close);
//             //         break;
//             // }
            
//         }).then( (db) =>{DatabaseCommunication.dbClose}).catch(console.log);
//     }
//     public static insertOne = function(db :any, err: Error, collection: string, document: object): Promise<string> {
//             return new Promise<string>(
//                 (resolve,reject) => {
//                console.log("2", document);
//                     resolve(db.collection(collection).insertOne(document));
//                     reject(console.error(err));
//                 }
//             );
//     }
//      public static dbClose = function(db :any): Promise<string> {
//             return new Promise<string>(
//                 resolve => {
//                     resolve(db.close());
//                 }
//             );
//     }
    
// }
export class DatabaseCommunication {
    
    public static connect = function(): Promise<DatabaseCommunication>{
        return new Promise<DatabaseCommunication>(
            (resolve, reject) => {
                resolve(MongoClient.connect("mongodb://localhost:27017/pizzeria"));
            }
        );
    }
    
    public static insertOne = function(db: any, collection: string, document: object): Promise<DatabaseCommunication> {
            return new Promise<DatabaseCommunication>(
                (resolve, reject) => {
                    db.collection(collection).insertOne(document);
                    resolve(db);
                        //if(err)reject(); return new Promise<DatabaseCommunication>(()=>{resolve(result)})}));
                }
            );
    }

     public static dbClose = function(db: any): Promise<DatabaseCommunication> {
            return new Promise<DatabaseCommunication>(
                (resolve, reject)=> {
                    resolve(db.close());
                }
            );
    }
}