import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './admin_view/index.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatButtonModule} from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import { LeaveRequestsComponent } from './leave-requests/leave-requests.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { DoctorViewComponent } from './doctor-view/doctor-view.component';
import { DoctorNavbarComponent } from './doctor-navbar/doctor-navbar.component';
import { LeaveStatusComponent } from './leave-status/leave-status.component';
import { PatientViewComponent } from './patient-view/patient-view.component';
import { RequestLeaveComponent } from './request-leave/request-leave.component';
import { MatBadgeModule } from '@angular/material/badge';
import { ApprovedLeavesComponent } from './approved-leaves/approved-leaves.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FooterComponent } from './footer/footer.component';
import { EditDoctorDetailsComponent } from './edit-doctor-details/edit-doctor-details.component';
import { InterceptorInterceptor } from './interceptor.interceptor';






@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    DialogComponent,
    LeaveRequestsComponent,
    AdminNavbarComponent,
    DoctorViewComponent,
    DoctorNavbarComponent,
    LeaveStatusComponent,
    PatientViewComponent,
    RequestLeaveComponent,
    ApprovedLeavesComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    EditDoctorDetailsComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatTabsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule
  
  
  ],
  providers: [InterceptorInterceptor],
  bootstrap: [AppComponent]
})
export class AppModule { }
