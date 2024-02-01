import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { ErrorMessageDialogComponent } from '../error-message-dialog/error-message-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-referred-candidate-admin',
  templateUrl: './referred-candidate-admin.component.html',
  styleUrls: ['./referred-candidate-admin.component.scss'],
})
export class ReferredCandidateAdminComponent implements OnInit {

  data: any;
  displayedColumns: string[] = [
    'candidateName',
    'willingToRelocate',
    'offerInHand',
    'servingNoticePeriod',
    'primarySkill',
    'experience',
    'contactNumber',
    'candidateEmail',
    'preferredLocation',
    'noticePeriodLeft',
    'actions'
  ];
  dataSource!: MatTableDataSource<any>;

  editingRowIndex: number = -1;

  constructor(private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllReferredCandidates();
  }

  getAllReferredCandidates() {
    const googleToken = this.authService.getToken();
    if (googleToken) {
      this.authService.getAllReferredCandidates(googleToken).subscribe(
        (response) => {
          this.data = response;
          this.data=this.data.candidates;
          this.dataSource = new MatTableDataSource(this.data.map((item: any, index: any) => ({ ...item, index })));
        },
        (error) => {
          this.showErrorDialog(error);
        }
      );
    } else {
      this.showErrorMessage('Error fetching Google Token');
    }
  }

  private showErrorMessage(message: string): void {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }

  editRow(index: number): void {
    this.editingRowIndex = index;
  }

  saveRow(index: number): void {
    this.editingRowIndex = -1;
    // Send the updated data to the backend here
    console.log('Updated data:', this.dataSource.data[index]);
    const googleToken=this.authService.getToken();
    if(googleToken){
      this.authService.editReferredCandidate(this.dataSource.data[index].id, googleToken,this.dataSource.data[index]).subscribe(
        (response)=>{
          this.showErrorMessage("Data edited Successfully");
        },
        (error)=>
        {
          this.showErrorDialog(error);
        }
      )
    }

  }
}

