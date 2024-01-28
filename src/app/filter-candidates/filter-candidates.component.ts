import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-filter-candidates',
  templateUrl: './filter-candidates.component.html',
  styleUrl: './filter-candidates.component.scss'
})
export class FilterCandidatesComponent {

  selectedFilter!: string;
  searchText!: string;
  filteredCandidates: any[] = [];
  isFilter=false;

  constructor(private authService : AuthService){}

  onFilterChange(){
    this.isFilter=true;
    const googleToken = this.authService.getToken();
    if(googleToken){
    if (this.selectedFilter && this.searchText) {
      this.authService.filterCandidates(googleToken,this.selectedFilter, this.searchText)
        .subscribe(
          (data: any) => {
          this.filteredCandidates = data['Filtered Candidates'];
          console.log(this.filteredCandidates);
        }, (error: any) => {
          console.error('Error fetching filtered candidates:', error);
        });
    }
  }
  }
}
