import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageemployeeComponent } from './manageemployee.component';

const routes: Routes = [{ path: '', component: ManageemployeeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageemployeeRoutingModule {}
