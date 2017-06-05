import * as fs from "fs-extra";

export class Playground{
    public static Hello = async function(){
        await Playground.Wait(3000);
        console.log("OH HELLO THERE");
        await Playground.Wait(5000);
        console.log("Still there? I won't do anything more, believe me.");
        await Playground.Wait(10000);
        console.log("Oh, okay. I will sing, just for you :)");
        await Playground.Sing();
    };
    private static Wait = function(time: number):Promise<void>{
        return new Promise<void>((resolve)=>{
            setTimeout(function() {
                resolve();
            }, time);
        });
    };
    private static Sing = function():Promise<void>{
        return new Promise<void>((resolve)=>{
            setTimeout(function(){
                resolve();
            }, 1500);
        });
    }
}