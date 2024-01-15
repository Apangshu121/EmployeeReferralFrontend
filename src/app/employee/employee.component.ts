import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent {
  constructor(private router: Router) {}
  onCard1Click(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
  onCard2Click(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
}