import * as sqlite3 from "sqlite3";

export class DbCommunication {
    file: string = "./pizzeria.sql";
    db: sqlite3.Database;


    // db.all("SELECT * FROM users", function(err :Error, rows :any) {  
    //        console.log(rows);  

    //  console.log(db);   
    // });
    select = (what :Array<string> = ["*"], from: Array<string>): Promise<object> => {
        return new Promise<object>(
            (resolve, reject)=>{
                let querry = "SELECT ";
                for(let i = 0; i < what.length; i++)querry += (i == what.length-1) ? what[i] + " " : what[i] + ", ";
                querry += "FROM ";
                for(let i = 0; i < from.length; i++)querry += (i == from.length-1) ? from[i] + " " : from[i] + ", ";
                console.log(querry);
                this.db.all(querry, (err: Error, result: object)=>{
                    if(err)reject(console.log(err));
                    resolve(result); 
                });
            });
     }
    
    insert = (tableName: string, record: object | JSON) => {
            //TODO: konwersja na json, wstawianie do bazy, result
    }

    close = () => {
        this.db.close();
    }

    constructor(source :string = "./pizzeria.sql"){
        this.file = source;
        this.db = new sqlite3.Database(this.file);
    }
}