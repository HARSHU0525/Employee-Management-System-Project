import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employee: Employee = {
    id: undefined,
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  employees: Employee[] = [];

  showUpdateButton = false;
  showUpdateForm = false;

  message = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  // Get all employees
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (error) => {
        console.error(error);

        this.errorMessage =
          error.error?.message || 'Failed to fetch employees';
      }
    });
  }

  // Add Employee
  addEmployee(): void {
    this.message = '';
    this.errorMessage = '';

    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added:', response);

        this.message = 'Employee added successfully!';

        // Keep the ID of the newly added employee
        this.employee.id = response.employee?.id;

        // Show Update button
        this.showUpdateButton = true;

        // Refresh employee list
        this.getEmployees();
      },

      error: (error) => {
        console.error(error);

        this.errorMessage =
          error.error?.message || 'Failed to add employee';
      }
    });
  }

  // Delete Employee
  deleteEmployee(id: number): void {
    this.message = '';
    this.errorMessage = '';

    this.employeeService.deleteEmployee(id).subscribe({
      next: () => {
        this.message = 'Employee deleted successfully!';

        this.employees = this.employees.filter(
          employee => employee.id !== id
        );
      },

      error: (error) => {
        console.error(error);

        this.errorMessage =
          error.error?.message || 'Failed to delete employee';
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

    this.employeeService.updateEmployee(
      this.employee.id,
      this.employee
    ).subscribe({
      next: (response) => {
        console.log('Employee updated:', response);

        this.message = 'Employee updated successfully!';

        this.showUpdateForm = false;

        // Refresh employee list
        this.getEmployees();
      },

      error: (error) => {
        console.error(error);

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