import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons:Person[] = [];

  personSubscription :Subscription = new Subscription();
  constructor(private service: PersonService,private route:Router) { }

  ngOnInit(): void {

    this.personSubscription = this.service.personSubject.subscribe(
      (data:any[])=>{
        this.persons = data;
      }
    );
   this.findAll();
  }

  findAll(){
    this.service.findAll().subscribe(data=>{
      console.log(data);
      this.persons = data;
    },
    (error)=>{
      console.log(error);
    }

    );
  }

  findById(id:number){
    this.service.findById(id).subscribe(
      data=>console.log(data),
      error=>console.log(error)
    );
  }

  trackById(person:Person, index:number) {
    return index;
  }

  onNew(){
    this.route.navigate(['person','new']);
  }

  onView(id:number){
    this.route.navigate(['/person', id]);
  }
}
