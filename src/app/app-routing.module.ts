import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

import { NavigationComponent } from './navigation/navigation.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';

import { from } from 'rxjs';
import { MyProfileComponent } from './my-profile/my-profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  
 
  {
    path: 'manage-employee',
    loadChildren: () =>
      import('./manage-employee/manage-employee.module').then(
        (m) => m.ManageEmployeeModule
      ),
  },
  {path:'job-openings', 
  loadChildren:()=> import('./job-openings/job-openings.module').then(
    (m)=>m.JobOpeningsModule),
  },
  {
    path: 'my-profile', 
    loadChildren:()=>import('./my-profile/my-profile.module').then(
      (m)=>m.MyProfileModule),
  },
 
  {
    path: 'my-referrals',
    loadChildren: () =>
      import('./my-referrals/my-referrals.module').then(
        (m) => m.MyReferralsModule
      ),
  },

  {
    path: 'refer-a-friend',
    loadChildren: () =>
      import('./refer-a-friend/refer-a-friend.module').then(
        (m) => m.ReferAFriendModule
      ),
  },



  {
    path: 'referred-candidates',
    loadChildren: () =>
      import('./referred-candidates/referred-candidates.module').then(
        (m) => m.ReferredCandidatesModule
      ),
  },

  {
    path: 'job-management',
    loadChildren: () =>
      import('./job-management/job-management.module').then(
        (m) => m.JobManagementModule
      ),
  },

  {
    path: 'filter-candidates',
    loadChildren: () =>
      import('./filter-candidates/filter-candidates.module').then(
        (m) => m.FilterCandidatesModule
      ),
  },
  {
    path: 'referrals-tally',
    loadChildren: () =>
      import('./referrals-tally/referrals-tally.module').then(
        (m) => m.ReferralsTallyModule
      ),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
