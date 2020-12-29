import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';
import { PersonComponent } from './person/person.component';
import { SinglePersonComponent } from './single-person/single-person.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  {path:'person', component:PersonComponent},
  {path:'person/new', component:FormComponent},
  {path:'person/update/:id', component:UpdateComponent},
  {path:'person/:id', component:SinglePersonComponent},
  {path:'', redirectTo:'person', pathMatch:'full'},
  {path:'**', redirectTo:'person'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
