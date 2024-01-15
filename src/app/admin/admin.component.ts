import { Component } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  constructor(private router: Router) {}
  onCard1Click(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
  onCard2Click(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
  onCard3Click(): void {
    // Navigate to the card details route
    this.router.navigate(['/navigation']);
  }
}
