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


  data!:any[];
  showJobPosts=false;
  isEdit=false;
  isAdd=false;
  isCard=true;
  googleSheetForm!:FormGroup;
  index! : number;
  isJob=false;
  jobData!:any;
  isShowJobs=false;

  constructor(private formBuilder : FormBuilder, private dataService : DataService, private router : Router){
    this.googleSheetForm=this.formBuilder.group({
      JobId: ['', Validators.required],
      Role: ['', Validators.required],
      YearsOfExperience: [0, Validators.required],
      TechStack: ['', Validators.required],
      Description: ['', Validators.required],
      Band: ['', Validators.required],
      BU: ['', Validators.required],
      Visibility:true
    });
  }

  jopOpenings(){
    this.router.navigate(['/app-job-openings']);
    this.isShowJobs=true;
  }

  // onBack(){
  //   this.isShowJobs=false;
  // }

  createSheet(){
    this.isAdd=true;
  }
  onSubmit(){
    if (this.googleSheetForm.valid) {
      const newData = this.googleSheetForm.value;

    this.dataService.createSheet(newData).subscribe(
      (response) => {
        console.log('Response from server:', response);
        console.log('Data added successfully');
      },
      (error) => {
        console.error('Error adding data:', error);
      }
    );
    this.isAdd = false;
  }
  }

  editSheet(i: number) {
    this.index = i;
    const dataBeingEdited = this.data[this.index];
    this.googleSheetForm.patchValue(dataBeingEdited);
    
    this.isEdit = true;
}
  onUpdate(){

    if (this.googleSheetForm.valid) {
      const newData = this.googleSheetForm.value;

      this.dataService.editSheet(this.index, newData).subscribe(
        (response) => {
          console.log('Response from server:', response);
          console.log('Data edited successfully');
        },
        (error) => {
          console.error('Error editing data:', error);
        }
      );
      this.isEdit = false;
    }
  }


  ngOnInit(): any{
    this.dataService.getData().subscribe((result)=>{
      this.data=result;
    });
  }

  deleteSheet(index : any){
    console.log(index);
    this.dataService.deleteSheet(index).subscribe(
      (response) => {
        console.log('Response from server:', response);
        console.log('Data deleted successfully');
      },
      (error) => {
        console.error('Error deleting data:', error);
      }
    );
  }
  showDetails(){
    this.showJobPosts=true;
  }

  onCard1Click(){
    this.router.navigate(['app-refer-a-friend']); 
  }

  onCard2Click(){
    console.log("My Refferals"); 
  }

  onCard3Click(){
    this.isCard=false;
  }

  jobInfo(index : number){
    this.isJob=true;
    this.jobData=this.data[index]
    console.log(this.jobData)
  }
  onClose(){
    this.isJob=false;
  }
}
