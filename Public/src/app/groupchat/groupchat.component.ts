import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Service1Service } from './../service1.service';

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupchatComponent implements OnInit {
  datalist: any;
  userdata: Array<any> = [];
  userName1: Array<any> = [];
  name: String;
  constructor(private service1Service: Service1Service,
    private router: Router) {
    this.service1Service.getroomId().subscribe((data) => {
      localStorage.setItem('chatRoomId', data._id);
      localStorage.setItem('participants', data.participants);
      this.router.navigate(['/chat'])
    })
  }

  ngOnInit() {
    this.getdata();

  }


  getdata() {
    this.service1Service.registerdata().subscribe(user => {
      this.datalist = user['data'];
    })
  }

  selectUser(id, name) {
    console.log(id)
    console.log(name)
    console.log(this.userdata)
    if (this.userdata.indexOf(id) == -1) {
      this.userdata.push(id)
      this.userName1.push(name)
    } else {
      return;
    }
  }

  submit() {
    let myId = localStorage.getItem('myId');
    this.userdata.push(myId)
    this.service1Service.createGroup({ participants: this.userdata, groupName: this.name, chatType: 'group' })

  }
}

