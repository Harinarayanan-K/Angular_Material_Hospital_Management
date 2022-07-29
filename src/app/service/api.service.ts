import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  header = {
    "Content-Type": "application/json",
    "Authorization": "Contacts " + localStorage.getItem("accesstoken"),
  }
  constructor(private http:HttpClient) { }
 addDoctor(data:any)
  { 
    return this.http.post<any>("http://localhost:8080/user/add", data, { "headers": this.header });
    }
    getDoctorsList() 
    {
      return this.http.get<any>("http://localhost:8080/user/list", { "headers": this.header });
    }
    login(data:any) {
       return this.http.post<any>("http://localhost:8080/login", data);
     }
     leaveRequest(data:any)
     {
      return this.http.post<any>("http://localhost:8080/user/leaveRequest",data, { "headers": this.header })
      }
      getLeaveRequests()
      { 
        return this.http.get<any>("http://localhost:8080/user/viewLeave",{ "headers": this.header })
      }
      approve(attendenceId:any)
      {
        return this.http.get("http://localhost:8080/user/approveLeave/"+attendenceId,{ "headers": this.header })
      }
      rejectedLeaves(attendenceId:any)
      {
         return this.http.get("http://localhost:8080/user/rejectLeave/"+attendenceId,{ "headers": this.header })
      }
      leaveStatus(doctorId:any) {
        return this.http.get<any>("http://localhost:8080/user/leaveStatus/"+doctorId,{ "headers": this.header })
      }
      approvedLeaves() {
        return this.http.get<any>("http://localhost:8080/user/approvedLeaves",{ "headers": this.header })
      }
      listDoctor(department:any,date:any) {
        return this.http.get("http://localhost:8080/patient/listDoctors/",{params: {"department":department,"date":date}})
      }
      listDepartment():Observable<any> {
        return this.http.get("http://localhost:8080/patient/listDepartment")
      }
      postPatient(data: any) {
        return this.http.post("http://localhost:8080/patient/book", data);
      }
      getLeaveDuration(date:any,id:any)
      {
        console.log("+++++",date,id)
        return this.http.get<any>("http://localhost:8080/patient/leaveDuration/",{params:{"date":date,"id":id}})
      }
      listTime(dates: any, doctorid: number) {
        return this.http.get("http://localhost:8080/patient/listTime/", { params: { "dates": dates, "doctorId": doctorid } })
      }
      getPatient(id: any) {
        return this.http.get<any>("http://localhost:8080/user/patientList/" + id, { "headers": this.header })
      }
      updateDoctor(doctorid: any, data: any) {
        return this.http.put("http://localhost:8080/user/edit/" + doctorid, data, { "headers": this.header })
      }
      validateEmail(data:any)
      {
        return this.http.get<any>("http://localhost:8080/user/findEmail/" + data, { "headers": this.header })
      }
      deleteDoctor(userId: number): Observable<any> {
        console.log(userId);
        return this.http.delete<any>("http://localhost:8080/user/delete/" + userId, { "headers": this.header })
      }
    
}
