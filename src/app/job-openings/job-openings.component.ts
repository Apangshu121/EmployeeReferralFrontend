import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-openings',
  templateUrl: './job-openings.component.html',
  styleUrl: './job-openings.component.scss',
})
export class JobOpeningsComponent implements OnInit {
  data!: any[];
  filteredData: any[] = []; // New array to store filtered data
  jobData!: any;
  isJob = false;
  searchTerm: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe((result) => {
      this.data = result;
      this.filteredData = result;
    });
  }

  onSearch() {
    this.performSearch(this.searchTerm);
  }

  // performSearch(searchTerm: string) {
  //   // Filter the data based on the Role property
  //   this.filteredData = this.data.filter((item) => {
  //     return item.Role.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

  //   // Reset to the original data if the search term is empty
  //   if (searchTerm.trim() === '') {
  //     this.filteredData = this.data;
  //   }
  // }


  performSearch(searchTerm: string) {
    // Filter the data based on Role or Skill property
    this.filteredData = this.data.filter((item) => {
      const roleMatches = item.Role.toLowerCase().includes(searchTerm.toLowerCase());
      const skillMatches = item.TechStack.toLowerCase().includes(searchTerm.toLowerCase());

      // Return true if either Role or Skill matches the search term
      return roleMatches || skillMatches;
    });

    // Reset to the original data if the search term is empty
    if (searchTerm.trim() === '') {
      this.filteredData = this.data;
    }
}





  onMore(index: number) {
    this.jobData = this.filteredData[index];
    this.isJob = true;
  }

  onClose() {
    this.isJob = false;
  }
}
