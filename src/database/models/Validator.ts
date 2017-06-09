export class Validator{
    problems: any = {};
    isEmail = (mail: string, name: string = "email", message : string = "Email is not proper")=>{
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //let regExp = new RegExp(re, mail)
        if(!re.test(mail))this.problems[name] = message;
        return mail;
    }
    isNumber = (number: number | string, name: string = "number", message: string = "Number is not proper")=>{
        let re = /^[0-9]*$/;
        if(typeof number == "number")number = number.toString();
        if(!re.test(number))this.problems[name] = message;
        return Number(number);
    }
    areEqual = (one: any, two: any, name: string = "strings", message: string = "Strings are not same.")=>{
        if(one == two)return true;
        else{
            this.problems[name] = message;
            return false;
        }
    }

    withoutSpecialSigns = (word: string, name: string = "string", message: string = "String has some special signs.")=>{
        let re = /[^a-zA-Z0-9]/;
        if(!re.test(word))this.problems[name] = message;
        return word;
    }
}