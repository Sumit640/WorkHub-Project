import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthData } from "./auth-data.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(name: string,eId: string,email: string,password: string) {
    const newAuthData: AuthData = {
      name: name,
      employeeId: eId,
      email: email,
      password: password
    };

    
    this.http.post("http://localhost:3000/api/user/register",newAuthData)
    .subscribe(response => {
      console.log(response);
    });
  }
}