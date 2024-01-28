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
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBadgeModule} from '@angular/material/badge';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDividerModule} from '@angular/material/divider';







import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationComponent } from './navigation/navigation.component';

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

const routes: Routes = [
  { path: 'my-referrals', component: MyReferralsComponent },
  // Add more routes as needed
];

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,

    JobOpeningsComponent,

    NavigationComponent,

    MyReferralsComponent,
    ReferAFriendComponent,
    ManageEmployeeComponent,
    MyProfileComponent,
    LandingPageComponent,
    ErrorMessageDialogComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
RouterModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatBadgeModule,
    MatCardModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatDividerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
