import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobOpeningsComponent } from './job-openings.component';

const routes: Routes = [{ path: '', component: JobOpeningsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobOpeningsRoutingModule {}
