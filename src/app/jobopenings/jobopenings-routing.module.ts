import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobopeningsComponent } from './jobopenings.component';

const routes: Routes = [{ path: '', component: JobopeningsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JobopeningsRoutingModule {}
