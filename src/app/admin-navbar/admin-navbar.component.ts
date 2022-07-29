import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EditDoctorDetailsComponent } from '../edit-doctor-details/edit-doctor-details.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  count!:any;
  leaveData!:any;

  constructor(private rt:Router,private service:ApiService) { }

  ngOnInit(): void {
    this.getLeaveRequests();
  }

  //Admin Logout
  logout() {
    localStorage.removeItem("accesstoken");
    this.rt.navigateByUrl('');
  }
//To Get LeaveRequest
  getLeaveRequests()
  {
     this.service.getLeaveRequests().subscribe(res=>{
      console.log("leave requests",res);
      this.leaveData=res;
      this.count = this.leaveData.length;
     })
    }
}
