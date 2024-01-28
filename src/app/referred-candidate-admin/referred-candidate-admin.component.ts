import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
interface UpdatedFields {
  businessUnit?: string;
  interviewedPosition?: string;
  band?: string;
  interviewStatus?: string;
  noOfRounds?: number;

}

@Component({
  selector: 'app-referred-candidate-admin',
  templateUrl: './referred-candidate-admin.component.html',
  styleUrl: './referred-candidate-admin.component.scss'
})
export class ReferredCandidateAdminComponent implements OnInit{

  data:any;
  showCandInfo=false;
  candidate:any;
  isCard=true;
  isUpdate=false;
  isShowJobs=false;
  isRefer=false;
  updateForm!: FormGroup;
  updatedDetails: any = {};
  selectedFilter!: string;
  searchText!: string;
  filteredCandidates: any[] = [];
  isFilter=false;
  displayedColumns: string[] = ['id', 'candidateName', 'candidateEmail', 'contactNumber', 'primarySkill', 'preferredLocation', 'experience', 'referrerEmail', 'actions'];
  roundsArray = [1, 2, 3, 4];
  interviewStatuses: string[] = [];
  isOpenfilter=false
  isSearch=false;
  isOpenSearch=false;
  searchKeyword!:string;
  searchResults: any;
  


constructor(private fb: FormBuilder, private authService : AuthService, private router: Router){

  this.updateForm = this.fb.group({
    businessUnit: ['', Validators.required],
    interviewedPosition: ['', Validators.required],
    band: ['', Validators.required],
    currentStatus: ['SELECT', Validators.required],
    interviewStatus: ['CODELYSER SELECT', Validators.required],
    noOfRounds: [0, Validators.required],
  });

}

  ngOnInit(){
    this.getAllReferredCandidates();
   
    this.interviewStatuses.push('CODELYSER SELECT');
    this.interviewStatuses.push('CODELYSER REJECT');
  
    this.updateForm.get('noOfRounds')!.valueChanges.subscribe((value) => {
      this.generateInterviewStatusOptions(value);
    });
  }

  generateInterviewStatusOptions(noOfRounds: number): void {
    // this.interviewStatuses = [];
    
    for (let i = 1; i <= noOfRounds; i++) {
      this.interviewStatuses.push(`R${i} SELECT`);
      this.interviewStatuses.push(`R${i} REJECT`);
    }
  }

  getAllReferredCandidates(){
    const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.getAllReferredCandidates(googleToken).subscribe(
        (response)=> {
        this.data=response;
        },
        (error)=>{
          alert("error while fetching data"+ error);
        }
        );
      }
    else{
      alert("error for google Token");
    }
  }

  
  onClose(){
    this.showCandInfo=false;
  }

  interviewTheCandidate(candidateId : number){
    const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.interviewTheCandidate(googleToken,candidateId).subscribe(
        (response)=>{
          alert(response.message + "\n please update details")
        },
        (error)=>{
          alert("Error" + error)
        }
      );
    }
    else{
      alert("You Are Not Authorized")
    }

  }

  sendMail(id:number){
    this.showCandInfo=false;    
    const googleToken=this.authService.getToken();
    if(googleToken){
      this.authService.sendMail(googleToken,id).subscribe(
        (response)=>{
          alert("Mails are sent successfully to both candidate and referrer")
        },
        (error)=>{
          alert("Error "+ error);
          
        }
      );
    }
    else{
      alert("Not Authorized");
      
    }
  }

  getTableDataSource(): any[] {
    if (this.isFilter) {
      return this.filteredCandidates;
    } else if(this.isSearch){
      return this.searchResults.SearchedCandidates;
    }
    else {
      return this.data.candidates;
    }
  }

  candidateInfo(index : number){
    console.log("Hello")
    this.showCandInfo=true;
    this.candidate=index;
    console.log(this.candidate);
  }

updateCandidateDetails() {
  this.isUpdate = false;
  this.showCandInfo = false;
  if (this.updateForm.valid){
    const googleToken = this.authService.getToken();
    if (googleToken) {
      const candidateId = this.candidate && this.candidate.id;

      if (candidateId) {
        const updatedDetails = this.updateForm.value;
        this.authService.updateCandidateDetails(googleToken, candidateId, updatedDetails).subscribe(
          (response) => {
            alert("Details updated successfully");
          },
          (error) => {
            alert("Error occurred"+ error.error);
          }
        );
      }else {
        alert("Invalid Candidate info");
      }
    } else {
      alert("Not Authorized");
    }
  } else {
    alert("Please update the necessary details");
  }
}



  onClick(){
    this.isUpdate=true;
  }

  getCandDetailsById(candId : number){
    this.showCandInfo=true;
    const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.getCandDetailsById(googleToken,candId).subscribe(
        (response)=>
        {
          this.candidate=response.candidate;
          console.log(this.candidate);
        },
        (error) =>
        {
          console.log("Error ", error);
        }
      );
    }
  }

  onFilterChange(){
    this.isFilter=true;
    const googleToken = this.authService.getToken();
    if(googleToken){
    if (this.selectedFilter && this.searchText) {
      console.log(this.searchText, this.selectedFilter);
      this.authService.filterCandidates(googleToken,this.selectedFilter, this.searchText)
        .subscribe(
          (response) => {
          this.filteredCandidates = response['Filtered Candidates'];
          console.log(this.filteredCandidates);
        }, (error: any) => {
          console.error('Error fetching filtered candidates:', error);
        });
    }
  }
  }

  openFilterComponent(){
    this.isOpenfilter=true;
  } 

  openSearchComponent(){
    this.isOpenSearch=true;
  }

  onSearchClicked(){
    this.isSearch=true;
    const googleToken = this.authService.getToken();
    if(googleToken){
      this.authService.searchCandidates(googleToken,this.searchKeyword).subscribe(
        (response)=>{
          this.searchResults = response;
          //this.searchResults=this.searchResults.searchCandidates
        },
        (error) =>{
          console.log(error);
        }
      )
    }
  }
}