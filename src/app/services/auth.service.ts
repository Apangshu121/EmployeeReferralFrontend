import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = 'http://localhost:8080/';

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  public signOutExternal = () => {
    this.cookieService.delete('authCookie');
    console.log('Token cookie deleted');
  };

  saveUser(credentials: string): Observable<any> {
    const header = new HttpHeaders().set(
      'Content-type',
      'text/plain;charset=UTF-8'
    );

    return this.httpClient.post(this.path + 'saveUser', credentials, {
      headers: header,
    });
  }

  getToken(): string | null {
    return this.cookieService.get('authCookie');
  }

  setToken(tokenPayload: string): void {
    const expirationDate = new Date();
    expirationDate.setTime(expirationDate.getTime() + 30 * 60 * 1000);
    this.cookieService.set('authCookie', tokenPayload, {
      expires: expirationDate,
    });
  }

  updateTokenTime(): void {
    const currentCookieValue = this.cookieService.get('authCookie');
    if (currentCookieValue) {
      console.log('Deleting cookie');

      this.cookieService.delete('authCookie');
      const expirationDate = new Date();
      console.log('Updating expiry time');
      expirationDate.setTime(expirationDate.getTime() + 1 * 60 * 1000);
      this.cookieService.set('authCookie', currentCookieValue, {
        expires: expirationDate,
      });
      console.log(expirationDate.getTime() + 1 * 60 * 1000);
    }
  }

  isTokenPresent(): boolean {
    return this.cookieService.check('authCookie');
  }

  getNameOfUser(googleToken: string): Observable<any> {
    console.log('Google Token:', googleToken);

    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );
    console.log(headers);

    return this.httpClient.get(this.path + 'user/getUserDetails', { headers });
  }
}
