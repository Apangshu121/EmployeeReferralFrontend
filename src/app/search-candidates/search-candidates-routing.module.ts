import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchCandidatesComponent } from './search-candidates.component';

const routes: Routes = [{path:'',component:SearchCandidatesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchCandidatesRoutingModule { }
