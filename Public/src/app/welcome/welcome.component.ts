import { Component, OnInit } from '@angular/core';
import { Service1Service } from './../service1.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr'
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  Generate_Class: FormGroup;
  submitted=false;
  constructor(private service1Service: Service1Service,private formBuilder: FormBuilder,private toastrService: ToastrService) { }

  ngOnInit() {
    this.Generate_Class = this.formBuilder.group({
      teacher_name:['',[Validators.required]],
      t_price:['',[Validators.required]],
      t_id: ['', Validators.required],
      t_name: ['', Validators.required],
    
    })
  }
  get f(){
    return this.Generate_Class.controls;
   }

  onSubmit()
  {
    console.log("submitted")
    this.submitted=true;
    if(this.Generate_Class.invalid)
    {
      this.toastrService.error("Inavild Input")
      return;
    }
    this.service1Service.generate_class(this.Generate_Class.value).subscribe(user=>{
     console.log("in create class",user)
    //  alert(user)
     this.toastrService.success("Class Created successfully")},err=>{
      console.log(err)})

      }

}



