import { MongoClient } from "mongodb";

export class DatabaseCommunication {

    public static connect = function(): Promise<DatabaseCommunication>{
        return new Promise<DatabaseCommunication>(
            (resolve, reject) => {
                resolve(MongoClient.connect("mongodb://localhost:27017/pizzeria"));
            }
        );
    }
    
    public static insertOne = function(db: any, collection: string, document: object, closedb: boolean = true, returnResult: Function  = ()=>{}): Promise<DatabaseCommunication> {
            return new Promise<DatabaseCommunication>(
                (resolve, reject) => {
                    db.collection(collection).insertOne(document, function(err: Error, result: any){
                        if(err)reject(err);
                        returnResult(result);//result.ops[0]
                        resolve(db);
                        if(closedb){
                            DatabaseCommunication.dbClose(db);
                            console.log("Database closed")
                        }
                        
                    });
                }
            );
    }
    public static findOne = function(db: any, collection: string, document: object, closedb: boolean = true, returnResult: Function  = ()=>{}): Promise<DatabaseCommunication> {
            return new Promise<DatabaseCommunication>(
                (resolve, reject) => {
                    db.collection(collection).findOne(document, function(err: Error, result: any){
                        if(err)reject(err);
                        returnResult(result);//result.ops[0]
                        resolve(db);
                        if(closedb){
                            DatabaseCommunication.dbClose(db);
                            console.log("Database closed")
                        }
                        
                    });
                }
            );
    }

     public static dbClose = function(db: any):void{
         db.close();
    }
}