import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-doctor-details',
  templateUrl: './edit-doctor-details.component.html',
  styleUrls: ['./edit-doctor-details.component.css']
})
export class EditDoctorDetailsComponent implements OnInit {
  doctorId: any;
  id!: number;
  flag!: number;
  doctorForm: any;
  emailValidity:any;


  constructor(private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialog: MatDialog, private service: ApiService,private dialogRef:MatDialogRef<EditDoctorDetailsComponent>) { }

  ngOnInit(): void {

    this.getDoctorsList();

    this.doctorForm = this.fb.group({

      name: ['', [Validators.required, Validators.pattern("^[a-zA-Z ]*$"), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      phoneNumber: ['', [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      password: ['', Validators.required],
      speciality: ['', Validators.required],
      education: ['', Validators.required],

    });
    console.log("data", this.editData);

    if (this.editData) {
      console.log("values", this.editData);
     
      this.doctorForm.controls['name'].setValue(this.editData.name)
      this.doctorForm.controls['email'].setValue(this.editData.email)
      this.doctorForm.controls['phoneNumber'].setValue(this.editData.phoneNumber)
      this.doctorForm.controls['password'].setValue(this.editData.password)
      this.doctorForm.controls['speciality'].setValue(this.editData.speciality)
      this.doctorForm.controls['education'].setValue(this.editData.education)
    }
  }

  updateDoctorDetails() {
    console.log(this.doctorForm.value);
   
    this.service.updateDoctor(this.editData.id, this.doctorForm.value).subscribe(res => {
      this.getDoctorsList();
      Swal.fire('Hi', "Doctor Details updated", 'success');
      this.doctorForm.reset();
      this.dialogRef.close();
      // this.service.getDoctorDetails();
      this.service.getDoctorsList().subscribe(res => {
        return res;
      })
    })
  }
  getDoctorsList()
  {
    this.service.getDoctorsList().subscribe(res=>{
    console.log("doctor list",res);
    })
  }
  
  
  public myError = (controlName: string, errorName: string) => {
    return this.doctorForm.controls[controlName].hasError(errorName);
  }

 
}
