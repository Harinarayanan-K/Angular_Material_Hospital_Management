import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  constructor(private fb:FormBuilder,private service:ApiService,private rt:Router) { }

  ngOnInit(): void {
  }
  loginForm=this.fb.group({
    email:['',Validators.required],
    password:['',Validators.required]
  })
  login(data:any)
  {
    this.service.login(data).subscribe(res=>{
      const name = res.name;
      const email = res.email;
      const type = res.type;
      const id = res.id;
      const accesstoken = res.accessToken.value;
      console.log(accesstoken);
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("doctorId", id);
      console.log(name);
      console.log(email);
      console.log(type);
      // check type=admin or doctor 
      if (type == 'admin') {
        this.rt.navigate(["index"])
      }
      else if (type == 'doctor') {
        this.rt.navigate(["doctor-view"])
      }

    })
  }
}
