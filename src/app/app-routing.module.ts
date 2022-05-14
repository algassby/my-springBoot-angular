import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildComponent } from './child/child.component';
import { FormComponent } from './form/form.component';
import { LoginComponent } from './login/login.component';
import { ParentComponent } from './parent/parent.component';
import { PersonComponent } from './person/person.component';
import { SinglePersonComponent } from './single-person/single-person.component';
import { UpdateComponent } from './update/update.component';
import { UploadFileComponent } from './upload-file/upload-file.component';


const routes: Routes = [
  {path:'person', component:PersonComponent},
  {path:'parent', component: ParentComponent},
  {path:'child', component: ChildComponent},
  {path:'person/new', component:FormComponent},
  {path:'person/update/:id', component:UpdateComponent},
  {path:'person/:id', component:SinglePersonComponent},
  {path:'login', component:LoginComponent},
  {path:'upload-file', component:UploadFileComponent},
  {path:'', redirectTo:'', pathMatch:'full'},
  {path:'**', redirectTo:'person'}
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
