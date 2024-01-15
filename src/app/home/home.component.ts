import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  role!: string;
  employeeFlag: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          this.role = data.role;

          if (this.role === 'EMPLOYEE') {
            this.employeeFlag = true;
            this.authService.updateTokenTime();
          }
        },
        (error) => {
          console.error('Error fetching user name:', error);
        }
      );
    } else {
      console.error('Authentication token not available.');
    }
  }

  onCardClick(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
}
