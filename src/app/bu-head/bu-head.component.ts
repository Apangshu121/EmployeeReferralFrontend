import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bu-head',
  templateUrl: './bu-head.component.html',
  styleUrl: './bu-head.component.scss'
})
export class BuHeadComponent {


  data!:any[];
  showJobPosts=false;
  isEdit=false;
  isAdd=false;
  googleSheetForm!:FormGroup;
  dataArray: any[]=[];
  index! : number;

  constructor(private formBuilder : FormBuilder, private dataService : DataService, private router : Router){
    this.googleSheetForm=this.formBuilder.group({
      JobId: ['', Validators.required],
      Role: ['', Validators.required],
      YearsOfExperience: [0, Validators.required],
      TechStack: ['', Validators.required],
      Description: ['', Validators.required],
      Bonus: [0, Validators.required],
      BU: ['', Validators.required],
    });
  }

  createSheet(){
    this.isAdd=true;

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
  ngOnInit(): any{
    this.dataService.getData().subscribe((result)=>{
      this.data=result;
    });
  }

  editSheet(i: number) {
      this.isEdit = true;
      this.index = i;
      const dataBeingEdited = this.dataArray[this.index];
      this.googleSheetForm.patchValue(dataBeingEdited);
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


}
