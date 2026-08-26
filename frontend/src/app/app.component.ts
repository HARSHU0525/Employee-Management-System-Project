import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeService, Employee } from './services/employee.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  employee: Employee = {
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  employees: Employee[] = [];

  message = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (error) => {
        console.error('Failed to fetch employees:', error);
      }
    });
  }

  addEmployee(): void {

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

        this.loadEmployees();
      },

      error: (error) => {
        console.error('Failed to add employee:', error);
        this.message = 'Failed to add employee';
      }
    });

  }

  deleteEmployee(id: number, index: number): void {

    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id).subscribe({

      next: () => {

        this.employees.splice(index, 1);

        this.message = 'Employee deleted successfully!';

      },

      error: (error) => {

        console.error('Failed to delete employee:', error);

        this.message = 'Failed to delete employee';

      }

    });

  }

}