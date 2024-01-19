import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss'
})
export class RecruiterComponent implements OnInit{

  isCard=true;
  isShowJobs=false;
  isRefer=false;
constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    console.log("HR Component");
    
  }
  onCard1Click(){
    this.isRefer=true;
    this.isCard=false;
    
  }

  onCard2Click(){
    console.log("card 2");
    
  }

  onCard3Click(){
    console.log("card 3");
    
  }

  jopOpenings(){
    this.router.navigate(['/app-job-openings']);
    this.isShowJobs=true;
  }

  onBack(){
    this.isShowJobs=false;
  }

  onClose(){
    this.isCard=true;
    this.isRefer=false;
  }
  
}
