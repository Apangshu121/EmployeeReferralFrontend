import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferredCandidateAdminComponent } from './referred-candidate-admin.component';

const routes: Routes = [{path:'',component:ReferredCandidateAdminComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferredCandidateAdminRoutingModule { }
