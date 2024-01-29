import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export interface Tally {
  name: string;
  totalReferrals: number;
  select: number;
  reject: number;
  inProgress: number;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  tallyData: Tally | null = null; // Initialize with null or default values

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Call the service to fetch Tally data from the API
    const googleToken = this.authService.getToken();
    if(googleToken){
    this.authService.getTallyData(googleToken).subscribe(
      (response: any) => {
        // Assuming the API response has a 'Tally' property
        this.tallyData = response.Tally as Tally;
      },
      (error) => {
        console.error('Error fetching Tally data:', error);
      }
    );
  }
}
}