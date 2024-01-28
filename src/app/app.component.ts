import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ErrorMessageDialogComponent } from './error-message-dialog/error-message-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'EmployeeReferral';
  isSideNavCollapsed =false;
  screenWidth=0;


  constructor(private authService: AuthService,private router: Router,
    private dialog: MatDialog) {}
  loginFlag: boolean = false;

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.loginFlag = true;
    }else{
      this.showErrorMessage('Please login again');
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

 
  
}
