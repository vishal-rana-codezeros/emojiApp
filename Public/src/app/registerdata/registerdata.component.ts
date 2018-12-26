import { Component, OnInit } from '@angular/core';
import { Service1Service } from './../service1.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'
import { RouterModule, Router, Route, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-registerdata',
  templateUrl: './registerdata.component.html',
  styleUrls: ['./registerdata.component.css']
})
export class RegisterdataComponent implements OnInit {
  datalist: any = [];
  datalist1: any = [];
  register_data: FormGroup;
  submitted = false;
  constructor(private service1Service: Service1Service, private formBuilder: FormBuilder, private router: Router, private auth: AuthService, private toastrService: ToastrService) {
    this.service1Service.getroomId1().subscribe((data) => {

      localStorage.setItem('chatRoomId', data._id);
      localStorage.setItem('participants', data.participants);
      this.router.navigate(['/chat'])
    })


  }
  ngOnInit() {
    this.getdata();
    this.getgroup();
  }
  getdata() {
    this.service1Service.registerdata().subscribe(user => {
      this.datalist = user['data'];
    })
  }

  connect(user) {
    this.submitted = true;
    this.service1Service.roomCreate(user._id);

  }
  connect1(user) {
    localStorage.setItem('chatRoomId', user)
    this.router.navigate(['/chat'])
  }



  groupCreate() {
    this.router.navigate(['/groupchat'])

  }


  getgroup() {
    this.service1Service.getgroup().subscribe((groupdata: any) => {
      console.log("Group data", groupdata)
      this.datalist1 = groupdata.data
    })
  }
  // connect(user) {
  //   let receiver = localStorage.setItem('receivers', user._id);
  //   this.submitted = true;
  //   this.service1Service.roomCreate(user._id);
  //   this.router.navigate(['/chat'])

  // }

}










