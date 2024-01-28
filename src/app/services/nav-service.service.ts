import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {
  collapsed: boolean = false;
  screenWidth: number = 0;

//   constructor() { }
  constructor() { }
}
