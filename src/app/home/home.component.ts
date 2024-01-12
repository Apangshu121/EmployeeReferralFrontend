import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  userName!: string;

  constructor(private authService: AuthService) {} // Use userService instead of authService

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          // Assuming the response contains a 'name' field
          this.userName = data.name;
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
