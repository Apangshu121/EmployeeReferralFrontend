import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  userName!: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          this.userName = data.name;
          console.log(this.userName)
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
    this.router.navigate(['/app-home']);
  }
}
