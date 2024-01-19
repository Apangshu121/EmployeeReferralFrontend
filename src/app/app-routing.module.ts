import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { NavigationComponent } from './navigation/navigation.component';
import { ReferAFriendComponent } from './refer-a-friend/refer-a-friend.component';

const routes: Routes = [
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'navigation', component: NavigationComponent, pathMatch: 'full' },
 
  //{path:'referafriend', loadChildren: ()=>
  //import('./referafriend/referafriend.module').then((m)=>m.ReferafriendModule)}
  // {path: 'referafriend', component:ReferafriendComponent}
  {path:'refer-a-friend', component:ReferAFriendComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
