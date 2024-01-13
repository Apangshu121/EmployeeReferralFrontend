import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  userName!: string;
  role!: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          this.userName = data.name;
          this.role = data.role;

          if (this.role === 'EMPLOYEE') {
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
}
