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
  loadChildren:()=> import('./job-openings/job-openings.module').then((m)=>m.JobOpeningsModule)},
  {
    path: 'my-profile', loadChildren:()=>import('./my-profile/my-profile.module').then((m)=>m.MyProfileModule)
  },
  // {
  //   path: 'job-openings',
  //   loadChildren: () =>
  //     import('./job-openings/job-openings.module').then(
  //       (m) => m.JobOpeningsModule
  //     ),
  // },
  // {
  //   path: 'manageemployee',
  //   loadChildren: () =>
  //     import('./manageemployee/manageemployee.module').then(
  //       (m) => m.ManageemployeeModule
  //     ),
  // },
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
