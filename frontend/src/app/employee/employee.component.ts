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
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  employees: Employee[] = [];

  message = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

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

  addEmployee(): void {
    this.message = '';
    this.errorMessage = '';

    this.employeeService.addEmployee(this.employee).subscribe({
      next: () => {

        this.message = 'Employee added successfully!';

        this.employee = {
          name: '',
          email: '',
          department: '',
          salary: 0,
          phone: ''
        };

        this.getEmployees();
      },

      error: (error) => {
        console.error(error);

        this.errorMessage =
          error.error?.message || 'Failed to add employee';
      }
    });
  }

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
}