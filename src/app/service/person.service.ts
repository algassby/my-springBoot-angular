import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Person } from '../model/person';
import { User } from '../model/user';



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  persons:Person[]= [];
  personSubject =  new Subject<Person[]>();

  http = `${environment.baseUrl}/person`;
  constructor(private httpClient:HttpClient) { }

  emitPersons(){
    this.personSubject.next(this.persons);
  }
  findAll():Observable<any> {
    return  this.httpClient.get<any[]>(this.http).pipe(
      // map((res: any[]) => {
      //   const data = res.map(obj => ({
      //     imageName: `data:image/jpg;base64,${obj.ImageName}`,
         
      //   }));
      //   return data;
      // })
      )
    // .pipe(map((response: any) => 
    // // imageName = JSON.stringify(response.imageName)
    //   response.json()
    // ));
  }
  findByName(nom:string):Observable<any> {
    return  this.httpClient.get(this.http+"/byName?nom="+nom);
  }
  create(person: Person):Observable<Object>{
    return this.httpClient.post(this.http+'/create', person);
  }

  createPerson(formData:FormData):Observable<Object>{
    return this.httpClient.post(`${this.http}/create`, formData);
  }

  findById(id:number):Observable<Object>{
    
    return this.httpClient.get(this.http+'/'+id);
  }
  update(person:FormData, id:number):Observable<Object>{
    return this.httpClient.put(this.http+'/update/'+id, person);
  }
  deleteById(id:number){
    return this.httpClient.delete(this.http+"/delete/"+id);
  }
}
