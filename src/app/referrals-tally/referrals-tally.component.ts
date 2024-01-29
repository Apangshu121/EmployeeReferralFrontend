import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-referrals-tally',
  templateUrl: './referrals-tally.component.html',
  styleUrl: './referrals-tally.component.scss'
})
export class ReferralsTallyComponent implements OnInit{
  
  allReferralsTally:any;

  ngOnInit(){
    console.log("Tally");
    this.getAllReferralsTally();
    // this.allReferralsTally=this.allReferralsTally.Tally;
    
  }
  constructor(private authService: AuthService){}
  getAllReferralsTally(){
    const googleToken=this.authService.getToken();
    if(googleToken)
    this.authService.getAllReferralsTally(googleToken).subscribe(
      (response)=>
      {
        this.allReferralsTally=response;
        console.log(this.allReferralsTally);

      },
      (error)=>
      {
        alert("Error"+error);
      }
    )
  }



}
