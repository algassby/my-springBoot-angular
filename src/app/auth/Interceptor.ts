import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { TokenStorageService } from "./token-storage.service";
const TOKEN_HEADER_KEY = 'Authorization';       // for Spring Boot back-end

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private token:TokenStorageService){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authReq = req;
        const token = this.token.getToken();
        const user = this.token.getUser();
        console.log(user);
        if (token != null) {
          // for Spring Boot back-end
          authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
          console.log(authReq);
    
          // for Node.js Express back-end
          // authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, token) });
          return next.handle(authReq);
        }
        else{
          return next.handle(req);
        }
        
      }
}