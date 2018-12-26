import { Service1Service } from './../service1.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'
import { RouterModule, Router, Route, ActivatedRoute } from '@angular/router';
import 'node_modules/ngx-toastr/toastr.css';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title: 'login';
  loginForm: FormGroup;
  profileForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private service1Service: Service1Service, private router: Router, private auth: AuthService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      emailId: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]],

    })
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.toastrService.error("Unauthorize user")
      return false;
    }
    if (this.loginForm.valid) {
      this.service1Service.login(this.loginForm.value).subscribe((response: any) => {
        this.toastrService.success("Logged in sucessfully");
        let token = localStorage.setItem('token', response.token);
        let myId = localStorage.setItem('myId', response.data._id);

        this.router.navigate(['/registerdata'])
      })


    }

  }
}










