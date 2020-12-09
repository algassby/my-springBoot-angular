import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PersonService {

  http = "http://127.0.0.1:8080/demo-0.0.1-SNAPSHOT/person";
  constructor(private httpClient:HttpClient) { }

  findAll():Observable<any> {
  return  this.httpClient.get(this.http);
  }
}
