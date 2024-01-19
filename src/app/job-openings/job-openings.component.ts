import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrl: './job-openings.component.scss'
})
export class JobOpeningsComponent implements OnInit{

  data!:any[];
  jobData!:any;
  isJob=false
  constructor(private dataService : DataService, private router:Router){
  }
  ngOnInit(): any{
    this.dataService.getData().subscribe((result)=>{
      this.data=result;
    });
  }

  onMore(index:number){
    this.jobData=this.data[index];
    this.isJob=true;
  }

  onClose(){
    this.isJob=false;
  }

  onBack(){
    this.router.navigate(['/app-home'])
  }
}
