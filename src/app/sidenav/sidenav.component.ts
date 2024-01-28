import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, Inject, OnInit, PLATFORM_ID ,Output,EventEmitter} from '@angular/core';
// import {MatToolbarModule} from '@angular/material/toolbar';
import { Router } from '@angular/router';
import{navbarData} from './nav-data'
import { NavServiceService } from '../services/nav-service.service';

import { DataService } from '../services/data.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  
  
})
export class SidenavComponent implements OnInit{
  navData = navbarData;

  constructor(public _dataService:NavServiceService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object,private authService:AuthService) {
    if (isPlatformBrowser(this.platformId)){
      this._dataService.screenWidth = window.innerWidth;
    }
  } 

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // this.screenWidth = window.innerWidth;
    if (isPlatformBrowser(this.platformId)){
      this._dataService.screenWidth = window.innerWidth;
    }
    if (this._dataService.screenWidth <= 768) {
      this._dataService.collapsed = false;
    }
  }

  

  toggleCollapse(): void {
    this._dataService.collapsed = !this._dataService.collapsed;
  }

  closeSidenav(): void {
    this._dataService.collapsed = false;
    }

    userName!: string;
    // role!: string;
  
    
  
    ngOnInit(): void {


      
      if (isPlatformBrowser(this.platformId)){
        this._dataService.screenWidth = window.innerWidth;
      }
      const googleToken = this.authService.getToken();
  
      if (googleToken) {
        this.authService.getNameOfUser(googleToken).subscribe(
          (data) => {
            this.userName = data.name;
            // this.role = data.role;
          },
          (error) => {
            console.error('Error fetching user name:', error);
          }
        );
      } else {
        console.error('Authentication token not available.');
      }
    }
    OnBackClick(): void {
      this.router.navigate(['/home']);
    }
}
