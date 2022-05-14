import { Component, Input, OnDestroy, OnInit, Type, ViewChild } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaStackItemSizeDirective } from '@fortawesome/angular-fontawesome';
import Swal from 'sweetalert2';
import { UploadFileService } from '../service/upload-file.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit, OnDestroy {

  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton') closebuttonU: any;

  nom : string ="";
  searchText :any;
  isDelete :boolean = false;
  defaultSexe = "Homme";
  persons:Person[] = [];
  ages:number[] = new Array(100);
  currentUser?: Person ;
  currentIndex = -1;
  sexes  = [
    { name:"Homme"},
    { name:"Femme"}
  ]
  noms= [
    {name:"barry"},
    {name:"barrio"},
    {name:"chala"},
    {name:"barya"},
    {name:"miranda"},
    {name:"chris jone"}
  ];
  personForm:FormGroup = new FormGroup({});


  personSubscription :Subscription = new Subscription();
  currentFile: any;
  selectedFiles: any;
  message ='';
  imagePath: any;
  imgURL :  any;
 
  constructor(private service: PersonService,private route:Router, 
    private formBuilder:FormBuilder,private router:ActivatedRoute,private uploadService:UploadFileService,private sanitizer:DomSanitizer ) { }
  ngOnDestroy(): void {
    this.personSubscription.unsubscribe();
  }

  
  ngOnInit(): void {

    this.noms.forEach(item=>this.nom=item.name);
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
      // this.persons.map(person=>{
      //  this.getImage(person);
      // })
    },
    (error)=>{
      console.log(error);
    }

    );
    //this.service.emitPersons();
  }

  searchByName(){
    
    //nom = this.nom;
    this.service.findByName(this.nom).subscribe(data=>{
      console.log(data);
      this.persons = data;
    },
    (error)=>{
      console.log(error);
    }

    );
  }

  refreshList(): void {
    this.findAll();
    this.currentUser = undefined;
    this.currentIndex = -1;
  }

  setActiveUser(user: Person, index: number): void {
    this.currentUser = user;
    this.currentIndex = index;
  }
  
  initForm(){
    this.personForm = this.formBuilder.group({

      nom:['', [Validators.required, Validators.minLength(3)]],
      password :['',Validators.required],
      fonction:['', Validators.required],
      tel:['', Validators.required],
      sexe:['', Validators.required],
      age:['', Validators.required],
      email:['',[Validators.required, Validators.email]],
      username:['', Validators.required]

    });
  }
  onSave(){

    // console.log(this.personForm.value);
    // const nom = this.personForm.get('nom')?.value;
    // const password = this.personForm.get('password')?.value;
    // const email = this.personForm.get('email')?.value;
    // const username = this.personForm.get('username')?.value;
    // const fonction = this.personForm.get('fonction')?.value;
    // const tel = this.personForm.get('tel')?.value;
    // const sexe = this.personForm.get('sexe')?.value;
    // const age = this.personForm.get('age')?.value;
    
    
    // const person = new Person(0,nom, password, fonction, tel, sexe, age,email,username);

    // console.log(person);
    //this.personForm.patchValue(this.service.findB{yId(id));
    const formData = new FormData();
    
    if(this.currentFile!==null){
      formData.append('file',this.currentFile,this.currentFile.name);
    }
    formData.append('person',new Blob([JSON.stringify(this.personForm.value)], {type: 'application/json'}));
    this.service.createPerson(formData).subscribe(
      data=>{
        console.log(data);
        this.findAll();
      }
       ,
      error=> console.log(error)
    );
    
    this.closebutton.nativeElement.click();
   
    //this.route.navigate(['/person']);
    //this.service.emitPersons();

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

  OnDelete(id:number){
    return this.service.deleteById(id).subscribe(
      (data:Object)=>{
        for(let i = 0; i < this.persons.length; ++i){
          if (this.persons[i].id === id) {
              this.persons.splice(i,1);
          }
      }
        this.isDelete =true;
        console.log(data);
        this.route.navigate(['/person']);
        }),
         (error:Error)=>{
        this.isDelete = false;
        console.log(error);
      }
    
  }
  /**
   * 
   * @param event s
   * @returns 
   */
  selectFile(event: any): void {
    if (event.target.files.length > 0){
      this.currentFile = event.target.files[0];
      
  }
}

getSafeImage(imgURL:any){
  // var reader = new FileReader();
  // let img = null as any;
  //    // this.imagePath = file;
  //     reader.readAsDataURL(new Blob([imgURL])); 
  //     reader.onload = (_event) => { 
  //       img = reader.result; 
        
  //     }
  return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64'+imgURL.base64string);
}

getImage(event:string) {
  let newFile = null as any ;
  let imgURL = null as any;
  this.uploadService.getData(event).subscribe(
    response =>{
      newFile = response;
      console.log(newFile);
      var reader = new FileReader();
    
     // this.imagePath = file;
      reader.readAsDataURL(newFile); 
      reader.onload = (_event) => { 
         imgURL = reader.result; 
        
      }
      this.sanitizer.bypassSecurityTrustUrl(imgURL)
    }
   );
 
}
  //Sweet alert
  tinyAlert(){
    Swal.fire('Hey there!');
  }
  
  successNotification(){
    Swal.fire('Hi', 'We have been informed!', 'success')
  }
  
  alertConfirmation(id:number){
    Swal.fire({
      title: 'Are you sure?',
      text: 'This process is irreversible.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think'
    }).then((result) => {
      if (result.value) {
        this.OnDelete(id);
        Swal.fire(
          'Removed!',
          'Product removed successfully.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Product still in our database.)',
          'error'
        )
      }
    })
  }   

}
