import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Backend එකේ Base URLs
  private authUrl = 'http://localhost:8080/api/auth';
  private userUrl = 'http://localhost:8080/api/user';

  constructor(private http: HttpClient) { }

  /**
   * අලුත් යූසර් කෙනෙක් රෙජිස්ටර් කරනවා
   * @param userData - යූසර්ගේ නම, ඊමේල්, බර, උස ඇතුළත් object එක
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData, { responseType: 'text' });
  }

  /**
   * යූසර්ව ලොගින් කරනවා
   * @param loginData - ඊමේල් සහ පාස්වර්ඩ් එක
   */
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, loginData, { responseType: 'text' });
  }

  /**
   * යූසර්ගේ බර, උස අනුව AI එකෙන් උපදෙස් ලබාගන්නවා
   * @param email - යූසර්ගේ ඊමේල් එක
   */
  getAiAdvice(email: string): Observable<any> {
    // Backend එකේ UserController එකේ @GetMapping("/personalized-advice") එකට කතා කරනවා
    return this.http.get(`${this.userUrl}/personalized-advice?email=${email}`, { responseType: 'text' });
  }
}