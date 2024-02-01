import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
export interface Tally {
  name: string;
  totalReferrals: number;
  select: number;
  reject: number;
  inProgress: number;
}

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements OnInit {
  role!: string;
  employeeFlag: boolean = false;
  adminFlag: boolean = false;
  referAFriend = false;

  // isBuhead = false;
  isSenior = false;
  isRecruiter = false;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;
  ngAfterViewChild() {
    this.observer.observe(['max-width:800px']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  constructor(
    private authService: AuthService,
    private router: Router,
    private observer: BreakpointObserver,
    private _ngZone: NgZone
  ) {}
  ngOnInit() {
    const googleToken = this.authService.getToken();
    // console.log(googleToken);
    if (googleToken) {
      // console.log(googleToken);
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
      // this.profile();
    } else {
      console.error('Authentication token not Available');
    }
  }
  public logout() {
    this.authService.signOutExternal();
    this._ngZone.run(() => {
      this.router.navigate(['']).then(() => window.location.reload());
    });
  }
  tallyData: Tally | null = null; // Initialize with null or default values

  profile() {
    // Call the service to fetch Tally data from the API
    const googleToken = this.authService.getToken();
    if (googleToken) {
      this.authService.getTallyData(googleToken).subscribe(
        (response: any) => {
          this.tallyData = response.Tally;
          console.log(this.tallyData);
        },
        (error) => {
          console.error('Error fetching Tally data:', error);
        }
      );
    }
  }
}
