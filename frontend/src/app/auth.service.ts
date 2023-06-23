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

  autoAuthenticateUser() {
    const authData = this.getAuthenticationData();
    if(!authData)
      return;
    
    const currentDate = new Date();
    if(authData.expirationDate > currentDate) {
      
      this.token = authData.token;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);

      const expiresIn = authData.expirationDate.getTime() - currentDate.getTime();
      this.setAuthenticationTimer(expiresIn / 1000);
      this.router.navigate(['/','user','statistics']);
    }
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
        const tokenExpiryDuration = response.expiresIn;
        this.setAuthenticationTimer(tokenExpiryDuration);

        this.isAuthenticated = true;
        this.authStatusListener.next(true);

        const currentDate = new Date();
        const expirationDate = new Date(currentDate.getTime() + tokenExpiryDuration*1000);

        // console.log(expirationDate);
        this.saveAuthenticationData(this.token,expirationDate);
        this.router.navigate(['/','user','statistics']);
      }
    });
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthenticationData();
    clearTimeout(this.tokenTimer);
  }

  private saveAuthenticationData(token: string,expirationDate: Date) {
    localStorage.setItem('token',token);
    localStorage.setItem('expiration',expirationDate.toISOString());
  }

  private clearAuthenticationData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthenticationData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  private setAuthenticationTimer(duration: number) {   // duration is in seconds
    console.log("Duration: " + duration);
    
    this.tokenTimer = setTimeout(() => {
      this.logout();
    },duration*1000);
  }

}