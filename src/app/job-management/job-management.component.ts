import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ErrorMessageDialogComponent } from '../error-message-dialog/error-message-dialog.component';


@Component({
  selector: 'app-job-management',
  templateUrl: './job-management.component.html',
  styleUrl: './job-management.component.scss',
})
export class JobManagementComponent implements OnInit {
  data!: any[];
  showJobPosts = true;
  isEdit = false;
  isAdd = false;
  // isCard=true;
  googleSheetForm!: FormGroup;
  index!: number;
  isJob = false;
  jobData!: any;
  isShowJobs = false;
  @ViewChild('jobDetailsTemplate', { static: true })
  jobDetailsTemplate!: TemplateRef<any>;

  dialogRef!: MatDialogRef<any>; // Use the specific type for dialogRef
  isSideNavCollapsed = false;
  screenWidth = 0;

  ngOnInit(): any {
    // console.log("BuHead");
    this.dataService.getData().subscribe((result) => {
      this.data = result;
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private dataService: DataService,
    private router: Router
  ) {
    this.googleSheetForm = this.formBuilder.group({
      JobId: ['', Validators.required],
      Role: ['', Validators.required],
      YearsOfExperience: [0, Validators.required],
      TechStack: ['', Validators.required],
      Description: ['', Validators.required],
      Band: ['', Validators.required],
      BU: ['', Validators.required],
      Visibility: true,
    });
  }

  createSheet() {
    this.isAdd = true;
    this.googleSheetForm = this.formBuilder.group({
      JobId: ['', Validators.required],
      Role: ['', Validators.required],
      YearsOfExperience: [0, Validators.required],
      TechStack: ['', Validators.required],
      Description: ['', Validators.required],
      Band: ['', Validators.required],
      BU: ['', Validators.required],
      Visibility: true,
    });
  }
  onSubmit() {
    // console.log('submit');
    if (this.googleSheetForm.valid) {
      const newData = this.googleSheetForm.value;
      // console.log(newData);

      this.dataService.createSheet(newData).subscribe(
        (response) => {
          this.showErrorMessage('Data Added Successfully');
        },
        (error) => {
          // console.error('Error adding data:', error);
        }
      );
      this.isAdd = false;
    } else {
      this.showErrorMessage('Please fill all the details');
    }
  }
  private showErrorMessage(message: string): void {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  editSheet(i: number) {
    this.index = i;
    const dataBeingEdited = this.data[this.index];
    this.googleSheetForm.patchValue(dataBeingEdited);

    this.isEdit = true;
  }
  onUpdate() {
    if (this.googleSheetForm.valid) {
      const newData = this.googleSheetForm.value;

      this.dataService.editSheet(this.index, newData).subscribe(
        (response) => {
          this.showErrorMessage('Data edited successfully');
        },
        (error) => {
          // console.error('Error editing data:', error);
        }
      );
      this.isEdit = false;
    } else {
      this.showErrorMessage('please fill all the details');
    }
  }

  deleteSheet(index: any) {
    // console.log(index);
    this.dataService.deleteSheet(index).subscribe(
      (response) => {
        // console.log('Response from server:', response);
        // console.log('Data deleted successfully');
      },
      (error) => {
        // console.error('Error deleting data:', error);
      }
    );
  }
  showDetails() {
    this.showJobPosts = true;
  }

  jobInfo(index: number) {
    this.isJob = true;
    this.jobData = this.data[index];

    // console.log(this.jobData);
  }

  closeJobCard(){
    this.isJob=false;
  }

  // openJobDetailsDialog(jobData: any, templateRef: TemplateRef<any>): void {
  //   // console.log(jobData);

  //   const dialogConfig = new MatDialogConfig();
  //   dialogConfig.width = '600px';
  //   dialogConfig.height = '300px';
  //   dialogConfig.data = { jobData };

  //   dialogConfig.panelClass = 'custom-dialog';

  //   this.dialog.open(templateRef, dialogConfig);
  // }

  // closeDialog(): void {
  //   if (this.dialogRef) {
  //     this.dialogRef.close();
  //   }
  // }

  onClose() {
    this.showJobPosts = false;
  }
  onAddClose() {
    // this.showJobPosts=false;
    this.isAdd = false;
  }
  onEditClose() {
    this.isEdit = false;
  }
}
