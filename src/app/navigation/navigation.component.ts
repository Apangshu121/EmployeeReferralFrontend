import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  userName!: string;
  role!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          this.userName = data.name;
          this.role = data.role;
        },
        (error) => {
          console.error('Error fetching user name:', error);
        }
      );
    } else {
      console.error('Authentication token not available.');
    }
  }
  OnBackClick(): void {

    this.router.navigate(['/home']);

  }
}
