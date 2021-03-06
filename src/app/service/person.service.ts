import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from '../model/person';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  persons:Person[]= [];
  personSubject =  new Subject<Person[]>();

  http = "http://127.0.0.1:8080/demo-0.0.1-SNAPSHOT/person";
  constructor(private httpClient:HttpClient) { }

  emitPersons(){
    this.personSubject.next(this.persons);
  }
  findAll():Observable<any> {
    return  this.httpClient.get(this.http);
  }
  findByName(nom:String):Observable<any> {
    return  this.httpClient.get(this.http+"/byName?nom="+nom);
  }
  create(person: Person):Observable<Object>{
    return this.httpClient.post(this.http+'/create', person);
  }

  findById(id:number):Observable<Object>{
    
    return this.httpClient.get(this.http+'/'+id);
  }
  update(person:User, id:number):Observable<Object>{
    return this.httpClient.put(this.http+'/update/'+id, person);
  }
  deleteById(id:number){
    return this.httpClient.delete(this.http+"/delete/"+id);
  }
}
