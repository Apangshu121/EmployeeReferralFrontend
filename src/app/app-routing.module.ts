import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { NavigationComponent } from './navigation/navigation.component';
import { JobopeningsComponent } from './jobopenings/jobopenings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';

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
    path: 'navigation',
    loadChildren: () =>
      import('./navigation/navigation.module').then((m) => m.NavigationModule),
  },
  {
    path: 'jobopenings',
    loadChildren: () =>
      import('./jobopenings/jobopenings.module').then(
        (m) => m.JobopeningsModule
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
