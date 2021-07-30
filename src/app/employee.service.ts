import { Injectable } from '@angular/core';
import{ HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

import{ Emp } from './emp';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  //  currentEmp : Emp;
   // empArray : Emp[];
   baseUrl = 'http://localhost:3000/employees/';

  constructor(public http : HttpClient) { }

  getAllEmployees(): Observable<Emp[]>
  {
     return this.http.get<Emp[]>(this.baseUrl);
  }

  get(id): Observable<Emp> {
    return this.http.get<Emp>(`${this.baseUrl}/${id}`);
  }

  create(data): Observable<Emp> {
    return this.http.post<Emp>(this.baseUrl, data);
  }

  update(id, data): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // deleteAll(): Observable<any> {
  //   return this.http.delete(this.baseUrl);
  // }

  // findByTitle(title): Observable<any> {
  //   return this.http.get(`${this.baseUrl}?title=${title}`);
  // }

  // getEmployeeById(id: number) : Emp{
  //   this.currentEmp = this.empArray.find((element: Emp) => {
  //     return element.empId == id;
  //   });

  //   return this.currentEmp;
  // }
}
