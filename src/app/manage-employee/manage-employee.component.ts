import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
// import { User } from './user.model';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss',
})
export class ManageEmployeeComponent implements OnInit {
  userName!: string;
  userRole!: string;
  update: boolean = false;
  editUserFlag: boolean = true;
  isAdmin: boolean = false;
  editFlag = false;

  user: any;
  displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'role',
    'businessUnit',
    'updateRole',
  ];
  getColumnAlignment(value: any): string {
    // Check the data type of the 'id' column and return the appropriate CSS class
    return typeof value === 'number' ? 'align-right' : 'align-left';
  }
  constructor(private authService: AuthService) {}

  searchQuery!: string;
  searchResults: any;
  onSearch() {
    const googleToken = this.authService.getToken();
    if (googleToken) {
      if (this.searchQuery != '') {
        this.editUserFlag = false;
        this.authService.search(googleToken, this.searchQuery).subscribe(
          (response) => {
            this.searchResults = response;

            // console.log("query: ",this.searchQuery);

            // console.log(this.searchResults.SearchedCandidates);
            this.searchResults = this.searchResults.SearchedCandidates;
            // console.log(this.searchResults);
            this.editFlag = true;
          },
          (error) => {
            alert('error while fetching data' + error);
          }
        );
      } else {
        console.log(this.user);
        this.searchResults = this.user.Users;
      }
    } else {
      alert('error for google Token');
    }
  }

  ngOnInit(): void {
    this.getAllUsers();
    this.getUserDetails();
  }

  getAllUsers(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getAllEmployees(googleToken).subscribe(
        (response) => {
          this.user = response;
          // console.log('All Users:', this.user);
        },
        (error) => {
          // console.error('Error fetching users:', error);
        }
      );
    }
  }
  getUserDetails(): void {
    const googleToken = this.authService.getToken();

    if (googleToken) {
      this.authService.getNameOfUser(googleToken).subscribe(
        (data) => {
          this.userName = data.name;
          this.userRole = data.role;
          //  console.log(this.userRole);
        },
        (error) => {
          // console.error('Error fetching user name:', error);
        }
      );
    } else {
      // console.error('Authentication token not available.');
    }
  }
  selectedUser: any;
  selectedRole: any;

  openEditCard(user: any): void {
    this.update = true;
    this.editUserFlag = false;
    this.editFlag = false;
    this.selectedUser = user;
    this.selectedRole = user.role; // Set the default role to the current role
  }

  editUser(user: any): void {
    const googleToken = this.authService.getToken();
    if (googleToken && this.selectedUser) {
      // console.log('google Token');
      const userEmail = this.selectedUser.email;
      if (
        this.selectedRole &&
        ['RECRUITER', 'SENIOR', 'EMPLOYEE', 'ADMIN'].includes(
          this.selectedRole.toUpperCase()
        )
      ) {
        this.authService
          .updateRole(googleToken, userEmail, this.selectedRole)
          .subscribe(
            (response) => {
              // console.log(user.email);
              this.selectedUser = null;
              this.selectedRole = null;

              // console.log('Role updated successfully:', response);
            },
            (error) => {
              // console.error('Error updating role:', error);
            }
          );
      }
    }
    this.editUserFlag = true;
    this.update = false;
    // this.editFlag = true;
  }
  close(): void {
    this.editUserFlag = true;
    this.update = false;
  }
}
