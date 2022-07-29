import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-request-leave',
  templateUrl: './request-leave.component.html',
  styleUrls: ['./request-leave.component.css']
})
export class RequestLeaveComponent implements OnInit {
  id!:any;

  constructor(private fb:FormBuilder,private service:ApiService) { }

  ngOnInit(): void {
  
  }
  leaveForm = this.fb.group({
    
    id:localStorage.getItem("doctorId"),
    leaveType: [''],
    date: [],
    duration: [''],
    description: ['']
  })
  requestLeave()
  {
    this.service.leaveRequest(this.leaveForm.value).subscribe(res=>{
         Swal.fire({
        text: 'Leave Requested',
        icon: 'success'
      });

    })

  }

}
