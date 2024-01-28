import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavServiceService } from './services/nav-service.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'EmployeeReferral';
  isSideNavCollapsed =false;
  screenWidth=0;

  constructor(private authService: AuthService, public _dataService:NavServiceService) {}
  loginFlag: boolean = false;

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.loginFlag = true;
    }else if(googleToken){
      this.loginFlag=false;
    }
  }

  onToggleSideNav():void{
    this.screenWidth=this._dataService.screenWidth;
    this.isSideNavCollapsed=this._dataService.collapsed;
  }
  
}
