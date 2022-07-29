import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './admin_view/index.component';
import { LoginComponent } from './login/login.component';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { HomeComponent } from './home/home.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'index',component:IndexComponent,canActivate:[AuthGuard]},
  {path:'leave-requests',component:LeaveRequestsComponent,canActivate:[AuthGuard]},
  {path:'doctor-view',component:DoctorViewComponent,canActivate:[AuthGuard]},
  {path:'leave-status',component:LeaveStatusComponent,canActivate:[AuthGuard]},
  {path:'approved-leaves',component:ApprovedLeavesComponent,canActivate:[AuthGuard]},
  {path:'patient-view',component:PatientViewComponent},
  {path:'home',component:HomeComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
