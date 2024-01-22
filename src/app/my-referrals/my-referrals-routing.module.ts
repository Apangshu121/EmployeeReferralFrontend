import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyReferralsComponent } from './my-referrals.component';

const routes: Routes = [{ path: '', component: MyReferralsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyReferralsRoutingModule {}
