import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  tallyData: any;
  roundStatus: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Call the service to fetch Tally data from the API
    const googleToken = this.authService.getToken();
    if (googleToken) {
      this.authService.getTallyData(googleToken).subscribe(
        (response: any) => {
          // Assuming the API response has a 'Tally' property
          this.tallyData = response.Tally;
        },
        (error) => {
          console.error('Error fetching Tally data:', error);
        }
      );
    }
    this.getRoundTallyOfUser();
  }
  getRoundTallyOfUser() {
    const googleToken = this.authService.getToken();
    if (googleToken) {
      this.authService.getRoundTallyOfUser(googleToken).subscribe(
        (response) => {
          // console.log(response);
          this.roundStatus = response;
        },
        (error) => {
          console.log('Error');
        }
      );
    }
  }
}
