import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '../model/person';
import { User } from '../model/user';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  personForm:FormGroup = new FormGroup({});
  defaultSexe = "Homme";
  ages :number[] = new Array(100);
  sexes  = [
    {name:"Homme"},
    {name:"Femme"}
  ]
  roles:any[]=[
    {
      id:1, name:"ROLE_ADMIN"
    },
    {
      id:2, name:"ROLE_SUPER_ADMIN"
    },
    {
      id:1, name:"ROLE_USER"
    },
  ]
   
  
  id :number =0;
  person:User  = new User(0,'','','',0,'',0, new Array());
  constructor(private service: PersonService,private router:Router, private formBuilder:FormBuilder,private route:ActivatedRoute) { 
   
    
  }


  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.service.findById(+id).subscribe(
      (data:any) =>{
        this.person = data;
      },
      error=>{
        console.log("Erreur de chargement"+error);
      }
    );
    this.initForm();
  }

  initForm(){
    this.personForm = this.formBuilder.group({

      id:[''],
      nom:['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
      password:['',Validators.required],
      fonction:['', [Validators.required,Validators.maxLength(30), Validators.minLength(3)]],
      tel:['', Validators.required],
      sexe:['', Validators.required],
      age:['', Validators.required],
      checkArray: this.formBuilder.array([])
      

    });
    
  }
  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.personForm.get('checkArray') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
 
  update(){
    this.id = this.person.id;
    const nom = this.personForm.get('nom')?.value;
    const password = this.personForm.get('password')?.value;
    const fonction = this.personForm.get('fonction')?.value;
    const tel = this.personForm.get('tel')?.value;
    const sexe = this.personForm.get('sexe')?.value;
    const age = this.personForm.get('age')?.value;
    const checkArray:any = this.personForm.get('checkArray')?.value;
    
    //const person = new Person(0,nom, fonction, tel, sexe, age,);
    this.person = new User(this.id,nom,password, fonction, tel, sexe, age,checkArray);
    this.service.update(this.person, this.id).subscribe(
      data=>{
        console.log(data);
        //this.person = new Person(this.id,nom,password, fonction, tel, sexe, age,);
      },
      error=>{
        console.log(error);
      }
    );
    console.log(this.person);
    this.service.emitPersons();
  }

  onUpdate(){
    // const id = this.personForm.get('id')?.value;
     this.update();
     this.router.navigate(['/person']);
  
   }
   onUpdateReturnPerson(){
    // const id = this.personForm.get('id')?.value;
     this.update();
     this.router.navigate(['/person',this.id]);
  
   }
   
   getAge(){
     for (let index = 1; index < 100; index++) {
       const element = this.ages[index];
       console.log(index);
       
     }
   }
   onBack(){
    this.router.navigate(['/person']);
   }
    
}
