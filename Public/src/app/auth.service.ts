// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }


import { Injectable } from '@angular/core';
import { RouterModule, Router, Route, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(private router: Router) { }
  
  sendToken(token: string) {
    localStorage.setItem("LoggedInUser", token)
  }
  // sendEmail(email: string) {
  //   localStorage.setItem("LoggedInUser", email)
  // }

  getToken() {
    return localStorage.getItem("LoggedInUser")
  }
  // getEmail() {
  //   return localStorage.getItem("LoggedInUser")
  // }
  isLoggednIn() {
  

    if (this.getToken() != null) {
     return true
    }  // return this.getEmail() !== null;


  }
  logout() {
    localStorage.clear();
    localStorage.removeItem("LoggedInUser");
    this.router.navigate(["register"]);
  }
}