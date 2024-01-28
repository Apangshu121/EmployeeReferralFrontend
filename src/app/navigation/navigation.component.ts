import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  role!: string;
  employeeFlag: boolean = false;
  adminFlag: boolean = false;

  isSenior = false;
  isRecruiter = false;
  isJobOpenings=false;
  jobOpenings():void{
    this.isJobOpenings=true;
  }

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
    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
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
  onClick(): void {
    // Navigate to the card details route
    this.router.navigate(['/job-openings']);
  }
}
