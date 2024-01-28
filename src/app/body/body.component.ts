import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {
  constructor(public _dataService:DataService){}


  getBodyClass(): string{
    let styleClass= '';
    // console.log(this._dataService.screenWidth);
    if(this._dataService.collapsed && this._dataService.screenWidth>768){
      styleClass='body-trimmed';
    }
    else if(this._dataService.collapsed && this._dataService.screenWidth<=768 && this._dataService.screenWidth>0) {
      styleClass='body-md-screen';
    }
    return styleClass;

  }

}