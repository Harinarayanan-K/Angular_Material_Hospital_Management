import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-doctor-view',
  templateUrl: './doctor-view.component.html',
  styleUrls: ['./doctor-view.component.css']
})
export class DoctorViewComponent implements OnInit {

  displayedColumns: string[] = ['patientName','gender','email','phoneNumber','appointmentDate','time'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
 

  constructor(private service:ApiService) { }

  ngOnInit(): void {
    this.getPatientDetails();
  }
  getPatientDetails() {
    const id = localStorage.getItem('doctorId');
    this.service.getPatient(id).subscribe(res => {
      console.log("patientdetails",res);
      this.dataSource=new MatTableDataSource(res);
      this.dataSource.paginator=this.paginator;
      this.dataSource.sort=this.sort;
 
  })

}
}
