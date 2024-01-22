
import { Component, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';


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
  noticePeriod: any;
  offerInHand!: boolean;
  showPdfModal: boolean = false;
  servingNoticePeriod!: boolean;
  // willingToRelocate:any;
  // blackListError: string = '';
  // isForm = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.refForm = this.fb.group({
      candidateName: [''],
      contactNumber: [''],
      candidateEmail: [''],
      experience: [''],
      primarySkill: [''],
      panNumber: [''],
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
    this.selectedFile = event.target.files[0] as File;
  }

  uploadPdf(): void {
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

          this.refForm.patchValue(refFormValue);

          this.extractedText = JSON.stringify(jsonResumeData, null, 2);
          this.enableForm();
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            const errorMessage = error.error;

            alert(`${errorMessage.error}`);
            this.onCannotReffer();
            this.disableForm();
          }
        }
        // console.error('Error extracting information from PDF:', error);
      );
    } else {
      alert('Please choose a valid PDF file.');
      this.disableForm();
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
      const formData = this.refForm.value;
      this.refForm.get('offerInHand')?.setValue(this.offerInHand === true);
      // console.log(formData);

      this.authService.saveCandidate(googleToken, formData).subscribe(
        (response) => {
          // console.log('Candidate saved successfully:', response);

          this.showSuccessMessage();
          // Handle success (e.g., navigate to another page)
        },
        (error) => {
          if (error instanceof HttpErrorResponse && error.status === 500) {
            const errorMessage = error.error.message;

            alert(` ${errorMessage}`);
          } else if (
            error instanceof HttpErrorResponse &&
            error.status === 401
          ) {
            const errorMessage = error.error.message;
            // console.log(errorMessage);
            alert(`${errorMessage}`);
          }
        }
      );
    } else {
      alert('Please fill in all fields before submitting.');
    }
  }
  showSuccessMessage() {
    alert('Form submitted successfully!');
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
}
