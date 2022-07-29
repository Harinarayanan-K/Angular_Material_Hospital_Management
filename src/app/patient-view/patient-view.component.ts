import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-patient-view',
  templateUrl: './patient-view.component.html',
  styleUrls: ['./patient-view.component.css']
})
export class PatientViewComponent implements OnInit {
  departments!: Array<string>;
  doctors!: any;
  leaveDuration!:any;
  appointment!: any;
  apptimes: Array<string> = [];
  booked = false;
  isDepartmentChanged:boolean = false;
  currentDepartment!:string;
  
  patientData!: any;
  id!: any;
  array!:any;


  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  constructor(private service:ApiService,private fb:FormBuilder,private rt:Router) { }

  ngOnInit(): void {
    this.listdep();
  }
   patientForm=this.fb.group({

    patientName: ['', [Validators.required]],
    gender: ['', Validators.required],
    email: ['', [Validators.required]],
    phoneNumber: ['', [Validators.required, Validators.pattern(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/)]],
    department: ['', Validators.required],
    doctorId: ['', Validators.required],
    appointmentDate: ['', Validators.required],
    time: ['', Validators.required],

   })
   postPatientDetails()
   { 
    if (this.patientForm.invalid) {
     
      return;
    }
    
    this.dates(this.patientForm.value.appointmentDate, this.patientForm.value.doctorId);
    let flag = 0;
    let time = this.patientForm.value.time;
   
    if (flag == 0) {
      this.service.postPatient(this.patientForm.value).subscribe(res => {
        this.patientForm.reset();
        Swal.fire('Hi', " your slot is booked", 'success');        
      });
    }

    
   }

  // list doctors when select department
  onChange(e: any,date:any) {
    console.log("hiii");
    
    this.isDepartmentChanged = true;
    this.currentDepartment = e;
    let department = e;
    console.log(department);
    this.service.listDoctor(department,date).subscribe(res => {
      this.doctors = res;
      console.log("doctors",this.doctors);
    })
   
  }
  //to check the slot availability when click the time
  availTime(time: any) {
    time = time.value;
    console.log(time);
    this.apptimes.forEach((value) => {
      if (time == value) {
        document.getElementById('t')?.style.backgroundColor=="red";
        
      }
    });
  }
  //fetch appointment times with respect to the selected date
  dates(d: any, e: any) {
    console.log("idd: ", e);
    console.log("dateee", d);
    
    
    if(this.isDepartmentChanged) {
     
    this.service.getLeaveDuration(d,e).subscribe(res=>{
      this.leaveDuration=res;
      this.listTime();
      // console.log("leaveduration",this.leaveDuration.duration);
      console.log("Response");
      console.log(res);
      
    })

      this.service.listTime(d, e).subscribe((res: any) => {
        console.log("app",res);
        
        this.apptimes = res;
        console.log("time--->",res);
      });
    } 
  }
  //list time accordence with doctor leave
    listTime()
    {
    if(this.leaveDuration.duration=='first half')
    {
      this.array=["12:0PM","1:00PM","1:30PM","2.00PM",'2:30PM','3:00PM'];
      
    }
    if(this.leaveDuration.duration=='second half')
    {
    this.array=["9:00AM","9:30AM","10:00AM","10:30AM","11:00AM","11:30AM"];
    }
    if(this.leaveDuration.duration==null)
    {
      this.array=["9:00AM","9:30AM","10:0AM","10:30AM","11:0AM","11:30AM","12:00PM","1:00PM","1:30PM","2.00PM",'2:30PM','3:00PM'];
    }
  }
  //fetch patient details
  // findPatient(patient: any) {
  //   console.log("patientHistory",patient);
  //   this.service.patientHistory(patient).subscribe(res => {
  //     this.patientData = res;
  //     console.log(res);
  //   })
  // }
//download patient history table in pdf format
  // download() {
  //   let element: any = document.getElementById('tblPatients');
  //   html2canvas(element).then((canvas) => {
  //     console.log(canvas);
  //     let imgData = canvas.toDataURL('image/png')
  //     let doc = new jsPDF()
  //     let imgHeight = canvas.height * 208 / canvas.width;
  //     doc.addImage(imgData, 0, 0, 208, imgHeight)
  //     doc.save("image.pdf")
  //   })
  // }  
  // list departments
  listdep(){ 
    console.log("LISTING DEPARTMENT");
    this.departments = []
    this.service.listDepartment().subscribe((res:any) => {
    res.forEach((item:string) => {
      console.log("dep",res);
      
        this.departments.push(item)
    });
  })
}
getFontWeight(i:any) {
  console.log();
  for (let j = 0; j < this.apptimes.length; j++) {
    if (i== this.apptimes[j]) {
      return true;
    }
  }
  return false;
}
}
