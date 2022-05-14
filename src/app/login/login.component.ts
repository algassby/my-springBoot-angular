import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { Person } from '../model/person';
import { Role } from '../model/role';
import { PersonService } from '../service/person.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  //roles: string[] = [];
  roles : Role[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router, private userService:PersonService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    let user = new Person(0,'','','',0,'',0,'','');
    this.authService.login(username, password).subscribe(
        (data: { accessToken: any; }) => {
          
        console.log(data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        
        this.router.navigate(['/person']);
 
       
        //this.reloadPage();
      },
      (      err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
/*
  reloadPage(): void {
    window.location.reload();
  }*/

}
