import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { compileNgModule } from '@angular/compiler';

@Component({
  selector: 'app-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrl: './recruiter.component.scss'
})
export class RecruiterComponent implements OnInit{
  ngOnInit(){
    console.log("HR Component");
    
  }

  
}
