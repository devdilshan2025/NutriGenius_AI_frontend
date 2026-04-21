import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
  // අපි මෙතනදී Angular එකට කියනවා එන්නේ JSON එකක් නෙවෙයි, Text එකක් කියලා
  return this.http.post(`${this.baseUrl}/register`, userData, { responseType: 'text' }); 
}
}