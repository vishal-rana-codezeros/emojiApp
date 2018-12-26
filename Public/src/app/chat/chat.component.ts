
import { Service1Service } from './../service1.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'
// import { send } from 'q';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  profileForm: FormGroup;hhhggh
  message: String
  chatData: any = [];
  submitted = false;

  constructor(private formBuilder: FormBuilder, private service1Service: Service1Service, private toastrService: ToastrService, ) {
    this.service1Service.send().subscribe((data) => {
    
      let roomId = localStorage.getItem("chatRoomId")
      if(data.roomId == roomId )
      {
      this.chatData.push(data)
      }
      else
      {
        return 
      }
    })
  }

  ngOnInit() {
   this.getchat()
    }

  getchat() {
    let roomId = localStorage.getItem("chatRoomId");
     this.service1Service.getchat(roomId).subscribe((data) => {
      this.chatData = data['data']
    })
  }

  

  onClick() {
    let senderId = localStorage.getItem("myId");
    let roomId = localStorage.getItem("chatRoomId");
     let obj = {
      senderId: senderId,
      roomId: roomId,
      content: this.message
    }
   this.service1Service.chatData(obj)
  }

  // onSubmit() {
  //   console.log(">>>>>>>>>>> into  chat")

  // }


}
