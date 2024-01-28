import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent implements OnInit {
  role!: string;
  userName!:string;
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit() {
    const googleToken = this.authService.getToken();
    if (googleToken) {
      
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {

          this.role = data.role;
           this.userName=data.name;
           console.log(this.role);
           
        },
        (error) => {
          console.log('error fetching Username', error);
        }
      );
    } else {
      console.error('Authentication token not Available');
    }
  }

  
}
