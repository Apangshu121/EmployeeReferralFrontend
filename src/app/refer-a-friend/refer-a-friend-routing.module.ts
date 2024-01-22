import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferAFriendComponent } from './refer-a-friend.component';

const routes: Routes = [{ path: '', component: ReferAFriendComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReferAFriendRoutingModule {}
