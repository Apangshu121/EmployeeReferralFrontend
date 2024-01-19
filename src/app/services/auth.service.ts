import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private path = 'http://localhost:8080/';

  constructor(private httpClient: HttpClient, private cookieService: CookieService) {}
 
  public signOutExternal = () => {
    this.cookieService.delete('authCookie');
    console.log('Token cookie deleted');
  };

  saveUser(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'text/plain;charset=UTF-8');
    
    return this.httpClient.post(
      this.path + 'saveUser',
      credentials,
      { headers: header }
    );
  }

  getToken(): string | null {
    return this.cookieService.get('authCookie');
  }

  setToken(tokenPayload:string): void {
    this.cookieService.set('authCookie', tokenPayload, { expires: 1 });
  }

  isTokenPresent(): boolean {
    return this.cookieService.check('authCookie');
  }

  getNameOfUser(googleToken: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });

    return this.httpClient.get(this.path + 'user/getUserDetails', {
      headers: headers,
    });
  }
  extractInfo(pdfFile: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('pdfFile', pdfFile, pdfFile.name);
    return this.httpClient.post<string>(
      `${this.path}api/extractInfo`,
      formData
    );
  }
  saveCandidate(googleToken: any, candidateData: any): Observable<any[]> {
    console.log('saveCandidate google token :' + googleToken);
  const headers = new HttpHeaders().set('Authorization', 'Bearer ' + googleToken);
  console.log(headers);

  return this.httpClient.post<any[]>(this.path + 'api/referredCandidates/add', candidateData, {
    headers,
  })
  .pipe(
    tap(response => console.log('Save Candidate Success:', response)),
    catchError(error => {
      console.error('Save Candidate Error:', error);
      throw error;
    })
  );
  }
}
