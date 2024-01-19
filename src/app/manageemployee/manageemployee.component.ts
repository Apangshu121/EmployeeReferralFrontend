import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-manageemployee',
  templateUrl: './manageemployee.component.html',
  styleUrl: './manageemployee.component.scss',
})
export class ManageemployeeComponent {
  constructor(private authService: AuthService) {}

  employees: any[] = [];

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    const googleToken = this.authService.getToken();
    if (googleToken) {
      this.authService.getAllEmployees(googleToken).subscribe((response) => {
        this.employees = response;
      });
    }
  }

  // updateRole(): void {
  //   const googleToken = this.authService.getToken();
  //   if (googleToken) {
  //     this.authService.updateRole(googleToken).subscribe((response) => {
  //       this.employees = response;

  //     });
  //   }
  // }
}
