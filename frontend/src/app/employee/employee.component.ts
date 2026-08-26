import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../services/employee.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  // ADD EMPLOYEE
  employee: Employee = {
    name: '',
    email: '',
    department: '',
    salary: 0,
    phone: ''
  };

  message = '';
  errorMessage = '';

  // VIEW EMPLOYEES
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchText = '';

  constructor(private employeeService: EmployeeService) {}

  // LOAD EMPLOYEES WHEN PAGE OPENS
  ngOnInit(): void {
    this.getEmployees();
  }

  // ADD EMPLOYEE
  addEmployee(): void {

    this.message = '';
    this.errorMessage = '';

    this.employeeService.addEmployee(this.employee).subscribe({

      next: (response) => {

        console.log('Employee added:', response);

        this.message = 'Employee added successfully!';

        // Clear form
        this.employee = {
          name: '',
          email: '',
          department: '',
          salary: 0,
          phone: ''
        };

        // Refresh employee list
        this.getEmployees();
      },

      error: (error: any) => {

        console.error('FULL ERROR:', error);

        this.errorMessage =
          error.error?.error ||
          error.error?.message ||
          error.message ||
          'Failed to add employee';
      }

    });
  }

  // GET ALL EMPLOYEES
  getEmployees(): void {

    this.employeeService.getEmployees().subscribe({

      next: (data: Employee[]) => {

        console.log('Employees received:', data);

        this.employees = data;

        this.filteredEmployees = data;

        this.searchEmployees();
      },

      error: (error: any) => {

        console.error('Error getting employees:', error);

        this.errorMessage =
          error.error?.error ||
          error.error?.message ||
          error.message ||
          'Failed to get employees';

        this.employees = [];
        this.filteredEmployees = [];
      }

    });
  }

  // SEARCH EMPLOYEES
  searchEmployees(): void {

    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.filteredEmployees = this.employees;
      return;
    }

    this.filteredEmployees = this.employees.filter((emp: Employee) =>
      emp.name.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search) ||
      emp.department.toLowerCase().includes(search) ||
      emp.phone.includes(search)
    );
  }
}