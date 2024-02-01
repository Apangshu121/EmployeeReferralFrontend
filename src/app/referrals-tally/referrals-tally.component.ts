import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-referrals-tally',
  templateUrl: './referrals-tally.component.html',
  styleUrl: './referrals-tally.component.scss',
})
export class ReferralsTallyComponent implements OnInit {
  allReferralsTally: any;
  displayedColumns: string[] = [
    'name',
    'totalReferrals',
    'inProgress',
    'reject',
    'select',
  ]; // Add more column names as needed

  ngOnInit() {
    console.log('Tally');
    this.getAllReferralsTally();
    // this.allReferralsTally=this.allReferralsTally.Tally;
  }
  constructor(private authService: AuthService) {}
  getAllReferralsTally() {
    const googleToken = this.authService.getToken();
    if (googleToken)
      this.authService.getAllReferralsTally(googleToken).subscribe(
        (response) => {
          this.allReferralsTally = response;
          this.allReferralsTally = this.allReferralsTally.Tally;
          console.log(this.allReferralsTally);
        },
        (error) => {
          alert('Error' + error);
        }
      );
  }
}
