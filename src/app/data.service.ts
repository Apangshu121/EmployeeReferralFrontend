import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sheet } from './models/sheet.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( private http : HttpClient) { }

  private apiUrl = 'https://sheet.best/api/sheets/fe88a680-2c26-45ba-aec7-0d6691606aec';
  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // createSheet(JobId:number, Role:string, YearsOfExperience:number, TechStack:string, Description:string, Bonus:number, BU:string):Observable<Sheet>{
  //   return this.http.post<Sheet>(`${this.apiUrl}`,{
  //     JobId, Role, YearsOfExperience, TechStack, Description, Bonus, BU
  //   });
  // }

  // createSheet(newData: any): Observable<any> {
  //   return this.http.post(this.apiUrl, newData);
  // }

  createSheet(newData: any): Observable<any> {
    return this.http.post(this.apiUrl, newData);
  }
  

  //In service.ts
  
  deleteSheet(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getDetailsById(JobId:number){
    return this.http.get(`${this.apiUrl}/${JobId}`);
  }

  updateSheet(JobId:number, Role:string, YearsOfExperience:number, TechStack:string, Description:string, Bonus:number, BU:string){
    return this.http.put<Sheet>(`${this.apiUrl}`,{
      JobId, Role, YearsOfExperience, TechStack, Description, Bonus, BU
    });
  }

  editSheet(id: number, newData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, newData);
  }
}
