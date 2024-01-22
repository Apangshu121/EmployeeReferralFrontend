
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  title = 'EmployeeReferral';

  constructor(private authService: AuthService) {}
  loginFlag: boolean = false;

  ngOnInit(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.loginFlag = true;
    }
  }

}
