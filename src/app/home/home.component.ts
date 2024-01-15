import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  role!:string;
  isEmployee=true;
  isBuhead=false;
  constructor(private authService:AuthService, private router : Router){}
  ngOnInit(){
    const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.getNameOfUser(googleToken).subscribe(
        (data)=>{
          this.role=data.role;
          if(this.role=="BU_HEAD"){
            this.isBuhead=true;
          }
          else{
            this.isEmployee=true
          }
        },
        (error)=>{
          console.log("error fetching Username",error);
        }
      );
    }
    else{
      console.error("Authentication token not Available");
      
    }
  }

}
