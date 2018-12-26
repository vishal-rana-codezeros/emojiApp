// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'firstangular';
// }

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
@Component({
   selector: 'app-root',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
   })
export class AppComponent implements OnInit 
{
  constructor(public auth: AuthService) { }
  ngOnInit() {
  }
}

