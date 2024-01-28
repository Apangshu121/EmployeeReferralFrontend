import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

import { NavigationComponent } from './navigation/navigation.component';
import { JobOpeningsComponent } from './job-openings/job-openings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';
import { BuHeadComponent } from './bu-head/bu-head.component';
import { from } from 'rxjs';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    loadChildren: () =>
      import('./logout/logout.module').then((m) => m.LogoutModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/employee.component').then((m) => m.EmployeeComponent),
  },
  {
    path: 'bu-head',
    loadChildren: () =>
      import('./bu-head/bu-head.component').then((m) => m.BuHeadComponent),
  },
  {
    path: 'recruiter',
    loadChildren: () =>
      import('./recruiter/recruiter.component').then(
        (m) => m.RecruiterComponent
      ),
  },
  {
    path: 'manage-employee',
    loadChildren: () =>
      import('./manage-employee/manage-employee.module').then(
        (m) => m.ManageEmployeeModule
      ),
  },
  {
    path: 'navigation',
    loadChildren: () =>
      import('./navigation/navigation.module').then((m) => m.NavigationModule),
  },
  {
    path: 'job-openings',
    loadChildren: () =>
      import('./job-openings/job-openings.module').then(
        (m) => m.JobOpeningsModule
      ),
  },
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

  // {
  //   path: 'sidenav',
  //   loadChildren: () =>
  //     import('./sidenav/sidenav.module').then(
  //       (m) => m.SidenavModule
  //     ),
  // },

  // {
  //   path: 'body',
  //   loadChildren: () =>
  //     import('./body/body.module').then(
  //       (m) => m.BodyModule
  //     ),
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
