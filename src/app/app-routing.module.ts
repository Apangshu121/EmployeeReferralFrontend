import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';

import { JobOpeningsComponent } from './job-openings/job-openings.component';

import { MyReferralsComponent } from './my-referrals/my-referrals.component';

import { from } from 'rxjs';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ReferredCandidatesComponent } from './referred-candidates/referred-candidates.component';
// import { ReferredCandidateAdminComponent } from './referred-candidate-admin/referred-candidate-admin.component';
import { JobManagementComponent } from './job-management/job-management.component';
import { ReferralsTallyComponent } from './referrals-tally/referrals-tally.component';
import { BuSelectedCandidatesComponent } from './bu-selected-candidates/bu-selected-candidates.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },

  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'refer-a-friend', component: ReferAFriendComponent },
      { path: 'manage-employee', component: ManageEmployeeComponent },
      { path: 'job-openings', component: JobOpeningsComponent },
      { path: 'my-profile', component: MyProfileComponent },
      { path: 'my-referrals', component: MyReferralsComponent },
      { path: 'referred-candidates', component: ReferredCandidatesComponent },
      {
        path: 'bu-selected-candidates',
        component: BuSelectedCandidatesComponent,
      },
      {
        path: 'referred-candidate-admin',
        component: ReferredCandidateAdminComponent,
      },
      { path: 'job-management', component: JobManagementComponent },
      { path: 'referral-tally', component: ReferralsTallyComponent },

      // { path: '', redirectTo: '/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
