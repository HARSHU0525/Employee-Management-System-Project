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
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  message = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  addEmployee(): void {

    this.message = '';
    this.errorMessage = '';

    this.employeeService.addEmployee(this.employee).subscribe({
      next: (response) => {
        console.log('Employee added:', response);

        this.message = 'Employee added successfully!';

        this.employee = {
          name: '',
          email: '',
          department: '',
          salary: 0,
          phone: ''
        };
      },

      error: (error) => {
        console.error('Error adding employee:', error);

        this.errorMessage =
          error.error?.message || 'Failed to add employee';
      }
    });
  }
}