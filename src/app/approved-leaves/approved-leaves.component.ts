import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-approved-leaves',
  templateUrl: './approved-leaves.component.html',
  styleUrls: ['./approved-leaves.component.css']
})
export class ApprovedLeavesComponent implements OnInit {
  displayedColumns: string[] = ['doctorName', 'leaveType', 'date', 'duration', 'description'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: ApiService,) { }

  ngOnInit(): void {
    this.approvedLeaves();
  }
  //  Get Approved Leaves
  approvedLeaves() {
    this.service.approvedLeaves().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
