import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'EmployeeReferral';
  isValidUser=false;

   constructor(private authService : AuthService, private router : Router){}
   ngOnInit(){
    const googleToken=this.authService.getToken();
    if(googleToken){
      this.isValidUser=true;
    }
  }

}
