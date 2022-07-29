import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';
import { EditDoctorDetailsComponent } from '../edit-doctor-details/edit-doctor-details.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name!: string;
  department!: string;
  doctorsList!: any;
  displayedColumns: string[] = ['doctorName', 'email', 'phoneNumber', 'departments', 'education', 'edit'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private service: ApiService) {
  }

  ngOnInit(): any {
    this.getDoctorsList();
  }
  //  dialog for adding doctors
  openDialog() {
    this.dialog.open(DialogComponent,
      {
        width: '30%',
      });
  }

  // Edit Doctor Profile
  editDoctorDetails(row: any) {
    this.dialog.open(EditDoctorDetailsComponent,
      {
        width: '30%',
        data: row,
      }).afterClosed().subscribe(val => {
        if (val = 'save') {
          this.getDoctorsList();
        }
      })
  }

  // To Get Whole Doctor List
  getDoctorsList() {
    this.service.getDoctorsList().subscribe(res => {
      console.log("doctor list", res);

      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //to delete a doctor data
  deleteDoctorDetails(row: any) {
    this.service.deleteDoctor(row.id).subscribe(res => {
      console.log(res);
      Swal.fire('Hi', "Doctor Details updated", 'success');
      this.getDoctorsList();
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}



