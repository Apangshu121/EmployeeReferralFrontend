import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralsTallyComponent } from './referrals-tally.component';

const routes: Routes = [{path:'',component:ReferralsTallyComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralsTallyRoutingModule { }
