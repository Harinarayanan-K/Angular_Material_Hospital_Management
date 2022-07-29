import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  emailValidity: any;
  emailTest!: string;
  docEmail!:any;
  flag:boolean=true;
  
  
  
  constructor(private fb:FormBuilder,private dialog:MatDialog,private service:ApiService) { }
  doctorsList!:any;

  ngOnInit(): void {
    this.service.getDoctorsList();  
  }
  
  doctorForm=this.fb.group({
    id:['0'],
    name:['',[Validators.required,Validators.pattern("^[a-zA-Z ]*$"),Validators.minLength(4)]],
    email:['',[Validators.required,Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
    phoneNumber:['',[Validators.required,Validators.pattern("^[0-9]{10}$")]],
    password:['',[Validators.required]],
    speciality:['',[Validators.required]],
    education:['',[Validators.required]],
    type:['doctor']
 
  })
  addDoctor()
  { 
    this.service.addDoctor(this.doctorForm.value).subscribe(res=>{
      this.service.getDoctorsList();
      Swal.fire({
        text: 'Doctors details!',
        icon: 'success'
      });
       this.dialog.closeAll();
        console.log(this.doctorForm.value);
    })
  
  }
  public myError = (controlName: string, errorName: string) =>{
    return this.doctorForm.controls[controlName].hasError(errorName);
    }
    validateEmail() {

    
     this.service.validateEmail(this.doctorForm.value.email).subscribe(res=>{
    
        this.emailValidity=res.email;
        this.docEmail=this.doctorForm.value.email;

       
        // this.doctorForm.controls['email'].setErrors({'incorrect': true});
        // console.log("errors",this.doctorForm.value)
      })
  
    }


   matches(doctorForm: AbstractControl){
      doctorForm.value.email== this.emailValidity? null : {equals: true}

  }
     checkEmail()
    {
      if(this.emailValidity==this.doctorForm.value.email)
      {
       return this.emailTest=="email already exist";
       console.log("emailtest",this.emailTest);

      }
      return this.emailTest;
    }

}


