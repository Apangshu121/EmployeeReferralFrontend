import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSidenav } from '@angular/material/sidenav';


import {BreakpointObserver} from '@angular/cdk/layout';



@Component({
  selector: 'app-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss',

})
export class HomeComponent implements OnInit {
  role!: string;
  employeeFlag: boolean = false;
  adminFlag: boolean = false;



  isBuhead=false;
  isSenior = false;
  isRecruiter = false;

  // @ViewChild(MatSidenav) sidenav !: MatSidenav;
  
@ViewChild(MatSidenav) sidenav!:MatSidenav;
ngAfterViewChild(){
  this.observer.observe(['max-width:800px']).subscribe((res)=>{
    if(res.matches){
      this.sidenav.mode='over';
      this.sidenav.close();
    }else{
      this.sidenav.mode='side';
      this.sidenav.open();
    }
  });
}
  
  constructor(private authService: AuthService, private router: Router,private observer:BreakpointObserver) {}
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
            this.isSenior = true;
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

  isHome():void{
    this.router.navigate(['home']);
  }
  jobOpening():void{
    this.router.navigate(['job-openings']);
  }
  referFriend():void{
    this.router.navigate(['refer-a-friend']);
  }
  myReferrals():void{
    this.router.navigate(['my-referrals']);
  }
  referredCandidates():void{
    
  }
  myProfile():void{
    this.router.navigate(['my-profile']);
  }
  
  manageEmployee():void{
    this.router.navigate(['manage-employee']);
  }
 allReferredCandidates():void{
  this.router.navigate(['referred-candidates'])
 }

}
