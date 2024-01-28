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

  user: any;

  constructor(private authService: AuthService) {}

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
    this.selectedUser = user;
    this.selectedRole = user.role; // Set the default role to the current role
  }

  editUser(user: any): void {
    const googleToken = this.authService.getToken();
    if (googleToken && this.selectedUser) {
      console.log('google Token');
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
              console.log(user.email);
              this.selectedUser = null;
              this.selectedRole = null;

              console.log('Role updated successfully:', response);
            },
            (error) => {
              // console.error('Error updating role:', error);
            }
          );
      }
    }
    this.editUserFlag = true;
    this.update = false;
  }
  close(): void {
    this.editUserFlag = true;
    this.update = false;
  }
}
