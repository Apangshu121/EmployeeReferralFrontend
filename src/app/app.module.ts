import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoutComponent } from './logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuHeadComponent } from './bu-head/bu-head.component';

@NgModule({
  declarations: [
    AppComponent,
    LogoutComponent,
    HomeComponent,
    RecruiterComponent,
    BuHeadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
