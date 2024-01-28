import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterCandidatesComponent } from './filter-candidates.component';
import { AuthService } from '../services/auth.service';

const routes: Routes = [{path:'',  component:FilterCandidatesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilterCandidatesRoutingModule {

  
 }
