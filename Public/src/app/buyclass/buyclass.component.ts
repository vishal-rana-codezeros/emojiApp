import { Component, OnInit } from '@angular/core';
import { Service1Service } from './../service1.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'


@Component({
  selector: 'app-buyclass',
  templateUrl: './buyclass.component.html',
  styleUrls: ['./buyclass.component.css']
})
export class BuyclassComponent implements OnInit {
  buy_Class: FormGroup;
  purchase_class: FormGroup;
  submitted = false;
  constructor(private service1Service: Service1Service, private formBuilder: FormBuilder, private toastrService: ToastrService) { }
  adunits: any = [];
  msg1: any


  ngOnInit() {
    // alert("in buyClas")---->Print Data from Teacher Schema<----
    this.service1Service.buyclass(this.buy_Class).subscribe(user => {
      console.log(user)
      // alert(user)
      this.adunits = user['data'];
      console.log("tttttttttt", this.adunits)

      //  alert("Class Created successfully");
    }, err => {
      console.log(err)
    })

  }
  onClick(i) {

    this.service1Service.Purchase_Class(i).subscribe((data) => {
      // console.log("i", i);
      console.log("error in user", data)
      console.log("hhhhhhhhhh")
      this.toastrService.error(data['msg'])
      this.msg1 = data['data']._id
      console.log("id------------>", data['data'].class)
      console.log("class---------------------------->", data['data'].class)
      this.ngOnInit();
    }
      , err => {
        console.log("Error in Buyclass_Service", err)
        console.log("error in error", err)
        this.toastrService.success("err")
      })
  }
  disable(i) {

    //   this.service1Service.disable1().subscribe((data)=>
    //   {
    //   //  console.log("data in func----------------------->",data)
    //   return true;
    //   }
    //  ,err=>{
    //   // console.log("err in func-------------------------------->",err)
    //   return false;
    //   })

    if (this.msg1) {

      return true
    } else {
      console.log("lllllll")
      return false
    }
  }

}










