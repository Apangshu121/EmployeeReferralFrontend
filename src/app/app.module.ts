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
import { NavigationComponent } from './navigation/navigation.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { MyReferralsComponent } from './my-referrals/my-referrals.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,
    RecruiterComponent,
    BuHeadComponent,
    NavigationComponent,
    JobOpeningsComponent,
    ReferAFriendComponent,
    MyReferralsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
