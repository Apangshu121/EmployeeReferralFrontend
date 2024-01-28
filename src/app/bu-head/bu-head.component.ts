import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bu-head',
  templateUrl: './bu-head.component.html',
  styleUrl: './bu-head.component.scss'
})
export class BuHeadComponent implements OnInit{

  constructor(private router : Router){
    
  }

  ngOnInit(): any{
    
    console.log("BU Head");
  }

  onClick(){
    this.router.navigate(['/job-management'])
  }

 
}
