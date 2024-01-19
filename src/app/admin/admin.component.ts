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
    this.router.navigate(['/refer-a-friend']);
  }
  onCard2Click(): void {
    this.router.navigate(['/my-referrals']);
  }
  onCard3Click(): void {
    this.router.navigate(['/manageemployee']);
  }
}
