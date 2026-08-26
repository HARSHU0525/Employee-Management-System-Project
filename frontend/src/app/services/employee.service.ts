import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  phone: string;
}

interface EmployeeResponse {
  employees: Employee[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5001/api/employees';

  constructor(private http: HttpClient) {}

  // ADD EMPLOYEE
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post<any>(this.apiUrl, employee);
  }

  // VIEW ALL EMPLOYEES
  getEmployees(): Observable<Employee[]> {

    return this.http
      .get<EmployeeResponse>(this.apiUrl)
      .pipe(
        map(response => response.employees)
      );
  }
}