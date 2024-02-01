import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageDialogComponent } from '../error-message-dialog/error-message-dialog.component';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-refer-a-friend',
  templateUrl: './refer-a-friend.component.html',
  styleUrl: './refer-a-friend.component.scss',
})
export class ReferAFriendComponent {
  refForm!: FormGroup;
  selectedFile: File | null = null;
  extractedText: string | null = null;
  pdfSrc: string | null = null;
  preferredLocation: any;
  profileSource: any;
  businessUnit:any;
  noticePeriod: any;
  offerInHand!: boolean;
  showPdfModal: boolean = false;
  servingNoticePeriod!: boolean;
  blacklisted!: any;
  fileName!: any;
  fileUpload: boolean = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.refForm = this.fb.group({
      candidateName: [''],
      contactNumber: [''],
      candidateEmail: [''],
      experience: [''],
      primarySkill: [''],
      businessUnit:[''],
      blacklisted: [''],
      fileName: [''],
      preferredLocation: [''],
      noticePeriod: [''],
      vouch: [''],
      profileSource: [''],
      willingToRelocate: [''],
      offerInHand: [''],
      servingNoticePeriod: [''],
      noticePeriodLeft: [''],
      // other form controls...
    });
    this.disableForm();
  }
  onFileChange(event: any): void {
    // this.selectedFile = event.target.files[0] as File;
    this.selectedFile = event.target.files[0];

    if (this.selectedFile) {
      // Check file format
      if (this.selectedFile.type !== 'application/pdf') {
        this.showErrorMessage('Invalid file format. Please select a PDF file.');
        this.fileUpload = false;
        // return;
      }

      // Check file size
      const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB
      if (this.selectedFile.size > maxSizeInBytes) {
        this.showErrorMessage(
          'File size exceeds 2 MB limit. Please choose a smaller file.'
        );
        this.fileUpload = false;
        // return;
      }
    }
  }

  uploadPdf(): void {
    if (this.fileUpload) {
      if (this.selectedFile) {
        this.authService.extractInfo(this.selectedFile).subscribe(
          (jsonResumeData: any) => {
            const refFormValue = { ...this.refForm.value };
            refFormValue.contactNumber = jsonResumeData.phone;
            refFormValue.candidateEmail = jsonResumeData.email;
            refFormValue.candidateName = jsonResumeData.name;
            refFormValue.experience = jsonResumeData.experience
              ? Number(jsonResumeData.experience.split(' ')[0])
              : '0';
            refFormValue.primarySkill = jsonResumeData.primarySkill;
            refFormValue.fileName = jsonResumeData.filename;
            refFormValue.blacklisted = jsonResumeData.blacklisted;
            this.refForm.patchValue(refFormValue);
            this.extractedText = JSON.stringify(jsonResumeData, null, 2);
            this.enableForm();
          },
          (error) => {
            if (error instanceof HttpErrorResponse && error.status === 401) {
              const errorMessage = error.error;
              this.showErrorMessage(`${errorMessage.error}`);
              this.onCannotReffer();
              this.disableForm();
              // return;
            }
          }
        );
      } else {
        this.showErrorMessage('Please choose a valid PDF file.');
        this.disableForm();
        // return;
      }
    } else {
      this.showErrorMessage('Re-Upload valid pdf');
      this.fileUpload = true;
      this.selectedFile = null;
      // return;
    }
  }
  disableForm() {
    this.refForm.disable();
  }
  enableForm() {
    this.refForm.enable();
  }
  onCannotReffer() {
    this.selectedFile = null;
    this.refForm.reset();
    this.disableForm();
  }
  onSubmit() {
    const googleToken = this.authService.getToken();
    if (this.refForm.valid) {
      // console.log(this.refForm);
      this.refForm.get('offerInHand')?.setValue(this.offerInHand === true);
      const serve = this.refForm.get('servingNoticePeriod');
      const noticePeriodValue = this.refForm.get('noticePeriod');
      if (noticePeriodValue && serve) {
        if (serve.value == 'false') {
          const noticePeriodV = noticePeriodValue.value;
          this.refForm.patchValue({
            noticePeriodLeft: noticePeriodV,
          });
          // console.log('Form value before patch:', this.refForm.value);
          this.refForm.get('noticePeriodLeft')?.setValue(noticePeriodV);
        }
      } else {
        // console.log("Notice Period Left");
      }
      const formData = this.refForm.value;
      this.authService.saveCandidate(googleToken, formData).subscribe(
        (response) => {
          this.showSuccessMessage();
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 500) {
            const errorMessage = error.error.message;
            this.showErrorDialog(errorMessage);
            return;
          } else if (
            error instanceof HttpErrorResponse &&
            error.status === 401
          ) {
            const errorMessage = error.error.message;
            this.showErrorDialog(errorMessage);
          }
        }
      );
    } else {
      this.showErrorMessage('Please fill in all fields before submitting.');
    }
  }
  showSuccessMessage() {
    this.showErrorMessage('Form submitted successfully!');
    this.closeForm();
    this.router.navigate(['/home']);
  }
  formClosed: boolean = false;
  closeForm() {
    this.formClosed = true;
  }
  openPdf() {
    this.showPdfModal = true;
    window.open('assets/DummyResume.pdf', '_blank');
  }

  private showErrorMessage(message: string): void {
    const dialogRef = this.dialog.open(ErrorMessageDialogComponent, {
      data: { message: message },
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  showErrorDialog(errorMessage: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  }
}
