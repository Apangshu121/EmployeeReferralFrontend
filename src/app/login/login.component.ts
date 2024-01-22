import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private service: AuthService,
    private _ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id:
          '1099395230005-3al1826neta10s18um44o98i62g8to5b.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large', width: '100%' }
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  // Whenever google responds back with a token then that will go to this function
  async handleCredentialResponse(response: CredentialResponse) {
    try {
      await firstValueFrom(this.service.saveUser(response.credential)).then(
        (x) => {
          this.service.setToken(x.tokenPayload);
          console.log(x.tokenPayload)
          this.router.navigate(['/home']);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
