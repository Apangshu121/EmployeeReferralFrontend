import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'EmployeeReferral';
  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
    private observer: BreakpointObserver
  ) {}
  loginFlag: boolean = false;

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.loginFlag = true;
    } else {
      this.showErrorMessage('Please login again');
    }
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
    } else {
      console.error('Authentication token not Available');
    }
  }

  private showErrorMessage(message: string): void {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.router.navigate(['']);
    });
  }

  role!: string;
  employeeFlag: boolean = false;
  adminFlag: boolean = false;
  referAFriend = false;

  isBuhead = false;
  isSenior = false;
  isRecruiter = false;

  // @ViewChild(MatSidenav) sidenav !: MatSidenav;

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

  isHome(): void {
    this.router.navigate(['home']);
  }
  jobOpening(): void {
    this.router.navigate(['job-openings']);
  }
  referFriend(): void {
    this.referAFriend = true;
    this.router.navigate(['refer-a-friend']);
  }
  myReferrals(): void {
    this.router.navigate(['my-referrals']);
  }
  referredCandidates(): void {}
  myProfile(): void {
    this.router.navigate(['my-profile']);
  }

  manageEmployee(): void {
    this.router.navigate(['manage-employee']);
  }
  allReferredCandidates(): void {
    this.router.navigate(['referred-candidates']);
  }
  allReferredCandidatesAdmin(): void {
    this.router.navigate(['referred-candidate-admin']);
  }
}
