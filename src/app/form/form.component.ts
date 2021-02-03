import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  personForm:FormGroup = new  FormGroup({});
  defaultSexe ="Homme";
  ages :number[] = new Array(100);
  constructor(private service: PersonService,private route:Router, private formBuilder:FormBuilder) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.personForm = this.formBuilder.group({
      nom:['', [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      password:['',Validators.required],
      fonction:['', [Validators.required,Validators.maxLength(30), Validators.minLength(3)]],
      tel:['', Validators.required],
      sexe:['', [Validators.required]],
      age:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      username:['', Validators.required],
    });
  }
  onSave(){
    
    const nom = this.personForm.get('nom')?.value;
    const password = this.personForm.get('password')?.value;
    const fonction = this.personForm.get('fonction')?.value;

    const tel = this.personForm.get('tel')?.value;
    const sexe = this.personForm.get('sexe')?.value;
    const age = this.personForm.get('age')?.value;
    const email = this.personForm.get('email')?.value;
    const username = this.personForm.get('username')?.value;
   
    const person = new Person(0,nom, password, fonction, tel, sexe, age,email,username);
    //person.role = ["user"];
   // console.log(person.role);

    this.service.create(person).subscribe(  
      data => console.log(data),
      error=> console.log(error)
    );
    this.service.emitPersons();
    this.route.navigate(['/person']);

  }

}
