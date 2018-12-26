
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as io from 'socket.io-client';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'

  })
}


@Injectable({
  providedIn: 'root'
})
export class Service1Service {

  private socket = io('http://localhost:5001/')
  constructor(private http: HttpClient) {

  }


  public onMessage(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('message', (data: any) => observer.next(data));
    });
  }


  register(user1: any) {
    return this.http.post("http://localhost:5001/register", JSON.stringify(user1), httpOptions)
  }


  login(user2: any) {

    return this.http.post("http://localhost:5001/emojiApp/v2/api/user/login", JSON.stringify(user2), httpOptions)
  }


  registerdata() {

    let id = localStorage.getItem('myId')
    return this.http.get("http://localhost:5001/emojiApp/v2/api/user/getUserDetails/" + id, httpOptions)
  }

  getchat(roomId) {

    return this.http.get("http://localhost:5001/getChatDetails/" + roomId, httpOptions)

  }

  getgroup() {
    let id = localStorage.getItem('myId')
    return this.http.get("http://localhost:5001/groupData/" + id, httpOptions)
  }


  roomCreate(userId: any) {
    let myId = localStorage.getItem('myId');
    let obj = {
      myId, userId
    }
    this.socket.emit('roomCreate', obj);
    // this.socket.on('roomResponse1', function (data) {
    //   this.socket.on('roomResponse', function (data) {
    //   localStorage.setItem('chatRoomId', data._id);
    //   localStorage.setItem('participants', data.participants);
    // })
  }

  getroomId1() {
    let msg = new Observable<any>(result => {
      this.socket.on('roomResponse', function (chatData) {
        result.next(chatData)
      })
    })
    return msg;
  }

  createGroup(data) {
    let myId = localStorage.getItem('myId');
    console.log(">>>>data>>>..", data)
    this.socket.emit('createGroup', data);
  }

  getroomId() {
    let msg = new Observable<any>(result => {
      this.socket.on('groupResponce', function (chatData) {
        result.next(chatData)
      })
    })
    return msg;
  }


  chatData(obj) {
    this.socket.emit('chatData', obj);
  }


  send() {
    let msg = new Observable<any>(result => {
      this.socket.on('chatResponse', function (chatData) {
        result.next(chatData)

      })
    })
    return msg;
  }






















  generate_class(user3: any) {
    console.log("in class_generate")
    var g_class =
    {


      t_id: user3['t_id'],
      t_name: user3['t_name'],
      teacher_name: user3['teacher_name'],
      t_price: user3['t_price'],

    }
    return this.http.put("http://localhost:8099/classgenerate", JSON.stringify(user3), httpOptions)

  }
  buyclass(user4: any) {
    console.log("in Buyclass")
    let to = localStorage.getItem('Id');
    var buy_class =
    {


    }
    return this.http.put("http://localhost:8099/TeacherSchema/" + to, JSON.stringify(user4), httpOptions)

  }

  Purchase_Class(user5: any) {

    console.log("in purchaseclass", user5)
    console.log(user5)

    let id = localStorage.getItem('Id')
    let id1 = user5
    console.log("local storage id", id); console.log("class id", id1);

    return this.http.put("http://localhost:8099/buyclass/" + id + "/" + id1, httpOptions)




  }

  disable1() {
    let id = localStorage.getItem('Id')
    console.log("in reg datalocal storage id", id);
    return this.http.post("http://localhost:8099/disable/" + id, httpOptions)

  }



}







