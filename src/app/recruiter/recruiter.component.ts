import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss'
})
export class RecruiterComponent implements OnInit{

  data:any;
  candidate!:any;
  isCard=true;
  isUpdate=false
  showCandInfo=false;
  isShowJobs=false;
  isRefer=false;
  updatedCurrentStatus: string = '';
  updatedInterviewStatus: string = '';
  updatedBusinessUnit: string = '';
  updatedDetails: any = {};
constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    console.log("HR Component");
    
  }
  onCard1Click(){
    this.isCard=false;
    this.router.navigate(['/app-refer-a-friend']);
    
  }

  onCard2Click(){
    console.log("card 2");
    
  }
  onCard3Click(){
    this.isCard=false
    const googleToken = this.authService.getToken();
    if(googleToken){
    this.authService.getAllReferredCandidates(googleToken).subscribe(
      (response)=> {
      this.data=response;
      //console.log(this.data);
      },
      (error)=>{
        console.log("error while getting data", error);
      }

    );
  }
  else{
    console.log("error for google Token");
  }
  }

  jopOpenings(){
    this.router.navigate(['/app-job-openings']);
    this.isShowJobs=true;
  }

  onClose(){
    this.showCandInfo=false;
  }

  sendMail(index:number){
    this.showCandInfo=true;
    this.candidate=this.data.candidates[index];
    const googleToken=this.authService.getToken();
    if(googleToken){
      this.authService.sendMail(googleToken,this.candidate.id).subscribe(
        (response)=>{
          console.log("Response ", response);
        },
        (error)=>{
          console.log("Error ", error);
          
        }
      );
    }
    else{
      console.log("Not Authorized");
      
    }
  }

  candidateInfo(index : number){
    this.showCandInfo=true;
    this.candidate=this.data.candidates[index];
    console.log(index);
    
    console.log("this candidate")
    console.log(this.candidate); 
    this.updatedDetails = { ...this.candidate };
  }

  updateCandidateDetails(){
    this.isUpdate=false;
    this.showCandInfo=false
    console.log("update");
    if (this.candidate && this.candidate.id) {
      const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.updateCandidateDetails(googleToken,this.candidate.id,this.updatedDetails).subscribe(
        (response)=>{
        console.log("Details updated sucessfullty",response)
        },
        (error)=>{
          console.log("Error occured",error);
        }
      );
    } else {
      console.log("Not Authorized");
    }
  }
  else{
    console.log("Invalid Candidate info");
  }
}

  onClick(){
    this.isUpdate=true;
  }
  
}
