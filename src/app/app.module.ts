import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonComponent } from './person/person.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonService } from './service/person.service';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SinglePersonComponent } from './single-person/single-person.component';
import { UpdateComponent } from './update/update.component';
import {Ng2SearchPipeModule} from 'ng2-search-filter';
import { Interceptor } from './auth/Interceptor';
import { LoginComponent } from './login/login.component';
import { AuthService } from './auth/auth.service';
import { TokenStorageService } from './auth/token-storage.service';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { UpdateFormComponent } from './update-form/update-form.component';
import { DisplayComponentComponent } from './display-component/display-component.component';
import { VoterComponentComponent } from './voter-component/voter-component.component';

@NgModule({
  declarations: [
    AppComponent,
    PersonComponent,
    FormComponent,
    HeaderComponent,
    SinglePersonComponent,
    UpdateComponent,
    LoginComponent,
    UploadFileComponent,
    ParentComponent,
    ChildComponent,
    UpdateFormComponent,
    DisplayComponentComponent,
    VoterComponentComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FontAwesomeModule,
    Ng2SearchPipeModule
  ],
  providers: [
    PersonService,
    Interceptor,
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true } ,
    AuthService,
    TokenStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
