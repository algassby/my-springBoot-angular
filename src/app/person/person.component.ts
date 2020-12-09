import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  persons:Person[] = [];
  constructor(private service: PersonService) { }

  ngOnInit(): void {
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
}
