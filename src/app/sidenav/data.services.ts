import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServices {

  collapsed: boolean = false;
  screenWidth: number = 0;

  constructor() { }
}
