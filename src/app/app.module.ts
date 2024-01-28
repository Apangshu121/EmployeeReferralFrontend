import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { RecruiterComponent } from './recruiter/recruiter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BuHeadComponent } from './bu-head/bu-head.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { JobOpeningsComponent } from './job-openings/job-openings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';

import { NavigationComponent } from './navigation/navigation.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin/admin.component';

// import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReferredCandidatesComponent } from './referred-candidates/referred-candidates.component';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatPaginatorModule } from '@angular/material/paginator';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { FilterCandidatesComponent } from './filter-candidates/filter-candidates.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';


@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,
    RecruiterComponent,
    BuHeadComponent,
    JobOpeningsComponent,

    NavigationComponent,
    EmployeeComponent,
    AdminComponent,
    MyReferralsComponent,
    ReferAFriendComponent,
    ManageEmployeeComponent,
    ReferredCandidatesComponent,
    SidenavComponent,
    BodyComponent,
    JobManagementComponent,
    FilterCandidatesComponent,
    SearchCandidatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {

  
}
