import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-bu-selected-candidates',
  templateUrl: './bu-selected-candidates.component.html',
  styleUrl: './bu-selected-candidates.component.scss'
})
export class BuSelectedCandidatesComponent implements OnInit{

  selectedCandidates:any;
  displayedColumns: string[] = [
    'candidateName',
    'candidateEmail',
    'contactNumber',
    'primarySkill',
    'preferredLocation',
    'experience',
    'referrerEmail',
  ];
  constructor(private authService:AuthService){

  }
  ngOnInit(){
    this.getSelectedCandidates();
  }
  getSelectedCandidates(){
    const googleToken= this.authService.getToken();
    if(googleToken){
      this.authService.getSelectedCandidates(googleToken).subscribe(
        (response)=>
        {
            this.selectedCandidates=response;
            console.log(this.selectedCandidates);
        },
        (error)=>{
          console.log(error);
        }
      );
    }else{
      alert("Not Authorized")
    }
  }

}
