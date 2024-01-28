

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );
    console.log(headers);

    return this.httpClient.get(this.path + 'user/getUserDetails', { headers });
  }
  getAllEmployees(googleToken: string): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );
    // console.log(headers);
    return this.httpClient
      .get<any[]>(this.path + 'admin/users/all', {
        headers,
      })
      .pipe();
  }
  getReferredCandidatesOfUser(
    googleToken: string
  ): Observable<{ [key: string]: [{ [key: string]: string }] }> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );
    console.log(headers);
    return this.httpClient.get<{ [key: string]: [{ [key: string]: string }] }>(
      this.path + 'api/referredCandidates/getAllCandidatesOfUser',
      {
        headers,
      }
    );
  }
  extractInfo(pdfFile: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append('pdfFile', pdfFile, pdfFile.name);
    return this.httpClient.post<string>(
      `${this.path}api/extractInfo`,
      formData
    );
  }

  getAllReferredCandidates(googleToken: string): Observable<any[]> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient
      .get<any[]>(`${this.path}api/referredCandidates/getAll`, {
        headers: headers,
      })
      .pipe();
  }

  updateCandidateDetails(
    googleToken: string,
    candidateId: number,
    updatedDetails: any
  ): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient.put<any>(
      `${this.path}api/referredCandidates/update/${candidateId}`,
      updatedDetails,
      {
        headers: headers,
      }
    );
  }

  sendMail(googleToken: string, id: number) {
    const header = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    console.log(header);

    return this.httpClient.post<any>(
      `${this.path}api/referredCandidates/sendMail/${id}`,
      id,
      {
        headers: header,
      }
    );
  }
  saveCandidate(googleToken: any, candidateData: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );

    return this.httpClient
      .post<any[]>(this.path + 'api/referredCandidates/add', candidateData, {
        headers,
      })
      .pipe(
        catchError((error: any) => {
          if (
            error.error &&
            error.error.message === 'Candidate already referred'
          ) {
            console.warn('Warning: Candidate already referred');
          }
          return throwError(error);
        })
      );
  }
  createUser(user: any): Observable<any> {
    return this.httpClient.post<any>(
      this.path + 'api/referredCandidates/add',
      user
    );
  }

  updateRole(
    googleToken: any,
    userEmail: string,
    newRole: string
  ): Observable<any> {
    const header = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + googleToken
    );
    const modifiedUser = { role: newRole };

    return this.httpClient.put<any>(
      this.path + `admin/users/modify/${userEmail}`,
      modifiedUser,
      { headers: header }
    );
  }

  interviewTheCandidate(googleToken: string, id: number){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient.put<any>(
      `${this.path}api/referredCandidates/selectReferredCandidateForInterview/${id}`,id,{
        headers
      });
  }
  getCandDetailsById(googleToken: string, id: number){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient.get<any>(`${this.path}api/referredCandidates/get/${id}`,{headers});
  }

  filterCandidates(googleToken: string, filterType: string, value: any): Observable<any> {
    console.log(filterType, value);
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient.get(`${this.path}api/referredCandidates/filter/${filterType}/${value}`,{headers});
    
  }

  searchCandidates(googleToken:string, searchKeyword: string){
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + googleToken,
    });
    return this.httpClient
      .get<any[]>(`${this.path}api/referredCandidates/getAll?keyword=${searchKeyword}`, {
        headers: headers,
      })
      .pipe();
  }

}
