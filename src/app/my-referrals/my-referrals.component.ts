
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-my-referrals',
  templateUrl: './my-referrals.component.html',
  styleUrl: './my-referrals.component.scss',
})
export class MyReferralsComponent {
  constructor(private authService: AuthService) {}

  referredCandidates!: [{ [key: string]: string }];

  ngOnInit(): void {
    this.getMyReferrals();
    console.log('my referral');
  }

  getMyReferrals(): void {
    const googleToken = this.authService.getToken();
    console.log(googleToken);

    if (googleToken) {
      this.authService.getReferredCandidatesOfUser(googleToken).subscribe(
        (response) => {
          this.referredCandidates = response['referredCandidates'];
          // console.log(this.referredCandidates);
        },
        (error) => {
          console.error('Error fetching referrals:', error);
        }
      );
    }
  }

}
