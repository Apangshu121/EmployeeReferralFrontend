import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { MatDividerModule } from '@angular/material/divider';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

// import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

// const routes: Routes = [
//   { path: 'my-referrals', component: MyReferralsComponent },
//   // Add more routes as needed
// ];

import { ReferredCandidatesComponent } from './referred-candidates/referred-candidates.component';
import { MatSortModule } from '@angular/material/sort';

import { MatPaginatorModule } from '@angular/material/paginator';

import { JobManagementComponent } from './job-management/job-management.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ReferredCandidateAdminComponent } from './referred-candidate-admin/referred-candidate-admin.component';
import { ReferralsTallyComponent } from './referrals-tally/referrals-tally.component';
import { BuSelectedCandidatesComponent } from './bu-selected-candidates/bu-selected-candidates.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,
    JobOpeningsComponent,
    MyReferralsComponent,
    ReferAFriendComponent,
    ManageEmployeeComponent,
    MyProfileComponent,
    LandingPageComponent,
    ErrorMessageDialogComponent,
    ErrorDialogComponent,
    ReferredCandidatesComponent,
    ReferralsTallyComponent,
    JobManagementComponent,
    ReferredCandidateAdminComponent,
    AppLayoutComponent,
    BuSelectedCandidatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    MatToolbarModule,

    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
