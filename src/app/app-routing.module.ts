import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full'},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {path:'app-home', component: HomeComponent},
  {path: 'app-refer-a-friend', component:ReferAFriendComponent},
  {path: 'app-job-openings', component:JobOpeningsComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
