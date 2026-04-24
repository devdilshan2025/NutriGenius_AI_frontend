import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api'; 

  private authUrl = `${this.baseUrl}/auth`;
  private userUrl = `${this.baseUrl}/user`;
  private aiUrl = `${this.baseUrl}/ai`; 

  constructor(private http: HttpClient) { }

  /** * 1. අලුත් යූසර් කෙනෙක් රෙජිස්ටර් කරනවා 
   */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData, { responseType: 'text' });
  }

  /** * 2. යූසර්ව ලොගින් කරනවා 
   */
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, loginData, { responseType: 'text' });
  }

  /** * 3. Database එකේ ඉන්න යූසර්ගේ විස්තර (Weight, Height, Age) ලබාගැනීම
   * Dashboard එකේ සැබෑ දත්ත පෙන්වීමට මෙය භාවිතා කරයි.
   */
  getUserDetails(email: string): Observable<any> {
    return this.http.get(`${this.userUrl}/details`, {
      params: { email: email }
    });
  }

  /** * 4. Dashboard එක ලෝඩ් වෙද්දී එන මුල්ම Personalized AI Advice එක
   */
  getPersonalizedAdvice(email: string): Observable<string> {
    return this.http.get(`${this.aiUrl}/personalized-advice`, {
      params: { email: email },
      responseType: 'text'
    });
  }

  /** * 5. Chat Box එකෙන් Gemini AI සමඟ Chat කිරීම
   */
  getAiChat(message: string): Observable<string> {
    return this.http.get(`${this.aiUrl}/chat`, {
      params: { message: message },
      responseType: 'text'
    });
  }
}