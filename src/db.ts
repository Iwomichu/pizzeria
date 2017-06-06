import * as sqlite3 from "sqlite3";
import {Object} from 'core-js';

export class DbCommunication {
    file: string = "./pizzeria.sqlite3";
    db: sqlite3.Database;


    // db.all("SELECT * FROM users", function(err :Error, rows :any) {  
    //        console.log(rows);  

    //  console.log(db);   
    // });
    select = (what :Array<string> = ["*"], from: Array<string>, optional: string | null = null): Promise<Array<object>> => {
        return new Promise<Array<object>>(
            (resolve, reject)=>{
                let querry = "SELECT ";
                for(let i = 0; i < what.length; i++)querry += (i == what.length-1) ? what[i] + " " : what[i] + ", ";
                querry += "FROM ";
                for(let i = 0; i < from.length; i++)querry += (i == from.length-1) ? from[i] + " " : from[i] + ", ";

                if(optional){
                    querry += optional;
                }
                querry += ";"
                console.log(querry);
                this.db.all(querry, (err: Error, result: Array<object>)=>{
                    if(err){
                        reject(err);
                        console.error(err);
                    }
                    resolve(result); 
                });
            });
     }
    
    insert = (tableName: string, record: object): Promise<object> => {
         return new Promise<object>(
            (resolve, reject)=>{
                var i = 0;
                console.log( Object.keys(record), Object.values(record));

                let querry = "INSERT INTO ";
                querry += tableName + " (";
                for(let i = 0; i < Object.keys(record).length; i++)
                    querry += (i == Object.keys(record).length-1) ? Object.keys(record)[i] : Object.keys(record)[i] + ", ";
                querry += ") VALUES (";
                for(let i = 0; i < Object.keys(record).length; i++)
                    querry += (i == Object.keys(record).length-1) ? "\"" + Object.values(record)[i] + "\");" :  "\"" + Object.values(record)[i] + "\", ";

                console.log(querry);
                 this.db.all(querry, (err: Error, result: Array<object>)=>{
                    resolve(result); 
                    if(err){
                        reject();
                        console.error(err);
                    }
                });
         });
    }

    close = () => {
        this.db.close();
    }

    constructor(source :string = "./pizzeria.sqlite3"){
        this.file = source;
        this.db = new sqlite3.Database(this.file);
    }
}

export interface where{
    left: string;
    right: string;
    
}