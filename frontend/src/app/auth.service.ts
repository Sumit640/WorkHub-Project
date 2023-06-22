import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData, AuthLogin } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private tokenTimer: any;

  constructor(private http: HttpClient,private router:Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthenticateStatus() {
    return this.authStatusListener.asObservable();
  }

  createUser(name: string,eId: string,role:string,email: string,password: string) {
    const newAuthData: AuthData = {
      name: name,
      employeeId: eId,
      designation: role,
      email: email,
      password: password
    };

    this.http.post
    ("http://localhost:3000/userRegister",newAuthData)
    .subscribe(response => {
      console.log(response);
    });
  }

  loginAuth(eId: string,password: string) {
    const newAuthLogin: AuthLogin = {
      employeeId: eId,
      password: password,
    };
    this.http.post<{token: string,expiresIn: number}>("http://localhost:3000/userLogin",newAuthLogin)
    .subscribe(response => {
      const tokenExtracted = response.token;
      this.token = tokenExtracted;
      if(this.token) {
        
        const tokenExpiry = response.expiresIn;
        this.tokenTimer = setTimeout(() => {
          this.logout();
        },tokenExpiry*1000);

        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.router.navigate(['/','user','statistics']);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    clearTimeout(this.tokenTimer);
  }
}