import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RequestLeaveComponent } from '../request-leave/request-leave.component';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-doctor-navbar',
  templateUrl: './doctor-navbar.component.html',
  styleUrls: ['./doctor-navbar.component.css']
})
export class DoctorNavbarComponent implements OnInit {

  constructor(private dialog:MatDialog,private service:ApiService,private rt:Router) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.dialog.open(RequestLeaveComponent,
     {
      width:'30%',
      
    });
    
  }
  logout() {
    
    localStorage.removeItem("accesstoken");
    this.rt.navigateByUrl('');
  }

}
