import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
// import { DataServices } from '../sidenav/sidenav.component';
import { NavServiceService } from '../services/nav-service.service';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;

}

@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  role!: string;
  employeeFlag: boolean = false;
  adminFlag: boolean = false;



  isBuhead = false;
  isRecruiter = false;
  constructor(private authService: AuthService, private router: Router, public _dataService:NavServiceService) {}

 

  ngOnInit() {
    const googleToken = this.authService.getToken();
    console.log(googleToken);
    if (googleToken) {
      console.log(googleToken)
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          console.log(data.role);
          this.role = data.role;
          if (this.role == 'SENIOR') {
            this.isBuhead = true;
          } else if (this.role == 'RECRUITER') {
            this.isRecruiter = true;
          } else if (this.role === 'EMPLOYEE') {
            this.employeeFlag = true;
            // this.authService.updateTokenTime();
          } else if (this.role === 'ADMIN') {
            this.adminFlag = true;
          }
        },
        (error) => {
          console.log('error fetching Username', error);
        }
      );
    } else {
      console.error('Authentication token not Available');
    }
  }
  onClick(): void {
    // Navigate to the card details route
    this.router.navigate(['/job-openings']);
  }
  isSideNavCollapsed =false;
  screenWidth=0;

  

  onToggleSideNav():void{
    this.screenWidth=this._dataService.screenWidth;
    this.isSideNavCollapsed=this._dataService.collapsed;
  }
}
