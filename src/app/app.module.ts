import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EmployeeComponent } from './employee/employee.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { AdminComponent } from './admin/admin.component';
import { JobopeningsComponent } from './jobopenings/jobopenings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,
    NavigationComponent,
    EmployeeComponent,
    AdminComponent,
    JobopeningsComponent,
    MyReferralsComponent,
    ReferAFriendComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
