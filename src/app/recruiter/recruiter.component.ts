import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss'
})
export class RecruiterComponent implements OnInit{

constructor(private authService:AuthService, private router:Router){}

  ngOnInit(){
    console.log("HR Component");
    
  }
  onCard1Click(){
    this.router.navigate(['/referred-candidates']);
    
  }

  onCard2Click(){
    this.router.navigate(['/my-referrals']);
    console.log("card 2");
    
  }
  onCard3Click(){
    this.router.navigate(['/filter-candidates']);
  } 
}
