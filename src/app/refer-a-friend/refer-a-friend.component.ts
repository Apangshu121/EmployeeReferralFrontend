//component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-refer-a-friend',
  templateUrl: './refer-a-friend.component.html',
  styleUrls: ['./refer-a-friend.component.scss'] 
})
export class ReferAFriendComponent {
  refForm!: FormGroup;
  selectedFile: File | null = null;
  extractedText: string | null = null;
  pdfSrc: string | null = null;
  preferredLocation: any;
  profileSource:any;
  vouch!:boolean;
  willingToRelocate!:boolean;
  isServing!:boolean;
  noticePeriodLeft!:number;
  // profileSource: any;
  // isForm = true;
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.refForm = this.fb.group({
      candidateName: [''],
      contactNumber: [''],
      candidateEmail: [''],
      experience: [''],
      primarySkill: [''],
      panNumber: [''],
      preferredLocation: [''],
      noticePeriod: [''],
      vouch: [false],
      profileSource: [''],
      willingToRelocate:[false],
      servingNoticePeriod:[false],
      noticePeriodLeft:['']
      // other form controls...
    });
  }
  onFileChange(event: any): void {
    this.selectedFile = event.target.files[0] as File;
  }

  onCheckboxChange(event: any): void {
    this.refForm.get('vouch')?.setValue(event.target.checked);
  }

  onRelocationChange(event: any): void {
    this.refForm.get('willingToRelocate')?.setValue(event.target.checked);
  }

  onDropdownChange(event: any): void {
    this.refForm.get('profileSource')?.setValue(event.target.value);
  }
  onServingNoticePeriodCheck(event:any){
    this.refForm.get('servingNoticePeriod')?.setValue(event.target.value);
    this.isServing=event.target.value === 'true'
  }
  onLocationChange(event: any): void {
    this.refForm.get('preferredLocation')?.setValue(event.target.value);
  }

  uploadPdf(): void {
    if (this.selectedFile) {
      this.authService.extractInfo(this.selectedFile).subscribe(
        (jsonResumeData: any) => {
          const refFormValue = { ...this.refForm.value };
          refFormValue.contactNumber = jsonResumeData.phone;
          refFormValue.candidateEmail = jsonResumeData.email;
          refFormValue.candidateName = jsonResumeData.name;
          refFormValue.experience = Number(
            jsonResumeData.experience.split(' ')[0]
          );
          refFormValue.primarySkill = jsonResumeData.primarySkill;
          this.refForm.patchValue(refFormValue);
          console.log('Extracted Data:', jsonResumeData);
          this.extractedText = JSON.stringify(jsonResumeData, null, 2);
        },
        (error) => {
          console.error('Error extracting information from PDF:', error);
        }
      );
    } else {
      alert('Please choose a valid PDF file.');
    }
  }
  onSubmit() {
    const googleToken = this.authService.getToken();
    if (this.refForm.valid) {
      console.log("Form is submitted");
      const formData = this.refForm.value;
      console.log(formData);
      this.authService.saveCandidate(googleToken, formData).subscribe(
        (response) => {
          console.log('Candidate saved successfully:', response);
          // Handle success (e.g., navigate to another page)
        },
        (error) => {
          console.error('Error saving candidate:', error);
          // Handle error
        }
      );
    }
    else{
      console.log('Form is invalid.');
      console.log('Form errors:', this.refForm.errors);
    }
  }
  
}
