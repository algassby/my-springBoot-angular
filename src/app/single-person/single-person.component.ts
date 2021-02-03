import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Person } from '../model/person';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-single-person',
  templateUrl: './single-person.component.html',
  styleUrls: ['./single-person.component.css']
})
export class SinglePersonComponent implements OnInit, OnDestroy {

  persons:Person[]= [];
  personSubject =  new Subject<Person[]>();
  person:Person = new Person(0,'', '', '',0,'',0,'','');
  isDelete: boolean = false;
  constructor(private route: ActivatedRoute , private service:PersonService, private router:Router) { }
  ngOnDestroy(): void {
    this.personSubject.unsubscribe();
  }

  ngOnInit(): void {
   this.person = new Person(0,'' ,'', '',0,'',0,'','');
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

  onUp(id:number){
    this.router.navigate(['/person','update',id]);
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
        this.router.navigate(['/person']);
        }),
         (error:Error)=>{
        this.isDelete = false;
        console.log(error);
      }
    
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
