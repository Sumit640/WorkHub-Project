import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData, AuthLogin } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
    this.http.post("http://localhost:3000/userLogin",newAuthLogin)
    .subscribe(response => {
      console.log(response);
    });
  }
}