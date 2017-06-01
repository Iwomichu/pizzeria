import { MongoClient } from "mongodb";

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