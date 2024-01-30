import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuSelectedCandidatesComponent } from './bu-selected-candidates.component';

const routes: Routes = [{path:'',component:BuSelectedCandidatesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuSelectedCandidatesRoutingModule { }
