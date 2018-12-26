import { Service1Service } from './../service1.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { RouterModule, Router, Route, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

// import { FormArray } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // title:'regform';
  profileForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private service1Service: Service1Service, private toastrService: ToastrService) { }


  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      userName: ['', Validators.required],
      fullName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10,16}$/)]],
      emailId: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)]],
      role: ['', Validators.required],
    })
  }
  get f() {
    return this.profileForm.controls;
  }

  onSubmit() {
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>Data submitted")
    this.submitted = true;
    if (this.profileForm.invalid) {
      this.toastrService.error("All fields are Require")
      return;
    }
    else {
      console.log("into else")
      this.service1Service.register(this.profileForm.value).subscribe(
        (data: any) => {
          this.toastrService.success("successfully register")
          // let token = localStorage.setItem('token', resposne.token);
          // let myId = localStorage.setItem('myId', resposne.data._id);
          // console.log("RESPONSW FOM BACKND", resposne);
        })
    }
  }
}


