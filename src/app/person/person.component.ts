import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton') closebuttonU: any;

  

  persons:Person[] = [];
  personForm:FormGroup = new FormGroup({});


  personSubscription :Subscription = new Subscription();
  constructor(private service: PersonService,private route:Router, private formBuilder:FormBuilder,private router:ActivatedRoute ) { }
  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

  
  ngOnInit(): void {

    this.personSubscription = this.service.personSubject.subscribe(
      (data:any[])=>{
        this.persons = data;
      }
    );
   
   this.initForm();
   this.findAll();
   this.service.emitPersons();
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
    //this.service.emitPersons();
  }
  initForm(){
    this.personForm = this.formBuilder.group({

      id:[''],
      nom:['', Validators.required],
      fonction:['', Validators.required],
      tel:['', Validators.required],
      sexe:['', Validators.required],
      age:['', Validators.required]

    });
  }
  onSave(){
   
    const nom = this.personForm.get('nom')?.value;
    const fonction = this.personForm.get('fonction')?.value;
    const tel = this.personForm.get('tel')?.value;
    const sexe = this.personForm.get('sexe')?.value;
    const age = this.personForm.get('age')?.value;
    const person = new Person(0,nom, fonction, tel, sexe, age,);

    //this.personForm.patchValue(this.service.findById(id));

    this.service.create(person).subscribe(
      data => console.log(data),
      error=> console.log(error)
    );
    
    this.closebutton.nativeElement.click();
    this.findAll();
    //this.route.navigate(['/person']);

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

  

  prepopulate(){
   
    this.personForm.setValue({
      nom: '',
      fonction:''
    } );
  }

  onUpdate(){
   // const id = this.personForm.get('id')?.value;
   // this.update();
    
    this.closebuttonU.nativeElement.click();
    this.findAll();
  }

  onNew(){
    this.route.navigate(['person','new']);
  }

  onView(id:number){
    this.route.navigate(['/person', id]);
  }

  onUp(id:number){
    this.route.navigate(['/person','update',id]);
  }


}
