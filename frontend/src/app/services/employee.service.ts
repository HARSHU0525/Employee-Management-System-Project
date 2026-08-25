import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  id?: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  phone: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5001/api/employees';

  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}