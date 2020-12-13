import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-single-person',
  templateUrl: './single-person.component.html',
  styleUrls: ['./single-person.component.css']
})
export class SinglePersonComponent implements OnInit {

  person:Person = new Person(0, '', '',0,'',0);
  constructor(private route: ActivatedRoute , private service:PersonService, private router:Router) { }

  ngOnInit(): void {
   this.person = new Person(0, '', '',0,'',0);
    const id = this.route.snapshot.params['id'];
    this.service.findById(+id).subscribe(
      (data:any) =>{
        this.person = data;
      },
      error=>{
        console.log("Erreur de chargement"+error);
      }
    );
  }

  onBack(){
    this.router.navigate(['/person']);
  }

}
