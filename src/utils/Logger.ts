import { time } from "console";

export class Logger {
private className:string;


constructor(className:string){
    this.className = className;
}

// log information messages

// info(message:string):void{
//    console.debug(this.timeStamp("INFO: " + message));
// }
info(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [INFO] [${this.className}] ${message}`);
  }

//log error message//
error(message:string):void{
   console.debug(this.timeStamp("ERROR: " + message));

}

warn(message:string):void{
  console.debug(this.timeStamp("WARN: " + message));


}

debug(message:string):void{
    
    console.debug(this.timeStamp("DEBUG: " + message));
}

timeStamp(message:string){
    const timesstamp= new Date().toISOString();
    return `[${this.className}] ${timesstamp} - ${message}`;

}


}