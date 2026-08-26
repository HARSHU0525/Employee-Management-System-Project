import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {

  employee: Employee = {
    id: undefined,
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  showUpdateButton = false;
  showUpdateForm = false;

  message = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  // Add Employee
  addEmployee(): void {
    this.message = '';
    this.errorMessage = '';

    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added:', response);

        this.message = 'Employee added successfully!';

        // Show the Update button after successful add
        this.showUpdateButton = true;

        // Keep the newly created employee ID
        this.employee.id = response.employee.id;

        console.log('New employee ID:', this.employee.id);
      },

      error: (error) => {
        console.error('Error adding employee:', error);

        this.errorMessage =
          error.error?.message || 'Failed to add employee';
      }
    });
  }

  // Open Update Form
  openUpdateForm(): void {
    this.showUpdateForm = true;

    this.message = '';
    this.errorMessage = '';
  }

  // Update Employee
  updateEmployee(): void {
    this.message = '';
    this.errorMessage = '';

    if (!this.employee.id) {
      this.errorMessage = 'Employee ID is required';
      return;
    }

    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
      next: (response) => {
        console.log('Employee updated:', response);

        this.message = 'Employee updated successfully!';

        this.showUpdateForm = false;
      },

      error: (error) => {
        console.error('Error updating employee:', error);

        this.errorMessage =
          error.error?.message || 'Failed to update employee';
      }
    });
  }

  // Cancel Update
  cancelUpdate(): void {
    this.showUpdateForm = false;

    this.message = '';
    this.errorMessage = '';
  }
}