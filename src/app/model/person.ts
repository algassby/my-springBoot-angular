import { Role } from "./role";

export class Person {
    /*id : Number = 0;
    nom : string = "";
    fonction : string = "";
    tel : Number = 0 ;
    sexe : string = "";
    age: Number = 0;*/

     roles: String [] =[] ;
   // public password:String = "";
    constructor(public id:number, public nom:String, public password:String, public fonction:String,public tel: number, public sexe:String,public age:number){
        this.roles =[""];
        
        
    }
   
    


}
