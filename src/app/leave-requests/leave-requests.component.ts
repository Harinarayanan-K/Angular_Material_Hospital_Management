import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-leave-requests',
  templateUrl: './leave-requests.component.html',
  styleUrls: ['./leave-requests.component.css']
})
export class LeaveRequestsComponent implements OnInit {
  leaveData!:any;
  count!:any;

  displayedColumns: string[] = ['doctorName', 'leaveType', 'date', 'duration','description','approve'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 
  constructor(private service:ApiService) {
    
   }

  ngOnInit(): void {
    this.getLeaveRequests();
  }
  getLeaveRequests()
  {
     this.service.getLeaveRequests().subscribe(res=>{

      console.log("leave requests",res);
      this.leaveData=res;
      this.count = this.leaveData.length;
      
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
     })
    }
    approve(row: any) {
      this.service.approve(row.attendenceId).subscribe(res => {
        this.getLeaveRequests();
        Swal.fire({
          text: 'Leave Approved',
          icon: 'success'
        });
      })
    }
    //reject leave request by admin
    reject(row: any) {
      this.service.rejectedLeaves(row.attendenceId).subscribe(res => {
        this.getLeaveRequests();
        Swal.fire({
          text: 'Leave Rejected',
          icon: 'success'
        });
      })
    }  
  }



