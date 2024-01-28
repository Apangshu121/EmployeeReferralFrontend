import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReferredCandidateService {

  baseUrl="http://localhost:8080/api/referredCandidates/add"

  constructor() { }
}
