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

  /** 1. Register User */
  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/register`, userData, { responseType: 'text' });
  }

  /** 2. Login User */
  loginUser(loginData: any): Observable<any> {
    return this.http.post(`${this.authUrl}/login`, loginData, { responseType: 'text' });
  }

  /** 3. Get User Details (Weight, Height, Age) */
  getUserDetails(email: string): Observable<any> {
    return this.http.get(`${this.userUrl}/details`, {
      params: { email: email }
    });
  }

  /** 4. Initial AI Advice for Dashboard */
  getPersonalizedAdvice(email: string): Observable<string> {
    return this.http.get(`${this.aiUrl}/personalized-advice`, {
      params: { email: email },
      responseType: 'text'
    });
  }

  /** 5. Gemini AI Chat */
  getAiChat(message: string): Observable<string> {
    return this.http.get(`${this.aiUrl}/chat`, {
      params: { message: message },
      responseType: 'text'
    });
  }

  /** 6. Get Workout Plan (අලුතින් ඇඩ් කළා) */
  getWorkoutPlan(email: string): Observable<any> {
    // මෙතන aiUrl පාවිච්චි කළා, එතකොට path එක නිවැරදියි
    return this.http.get<any>(`${this.aiUrl}/workout-plan`, {
      params: { email: email }
    });
  }

  /** 7. Get Diet Plan (පස්සේ ඕන වෙන නිසා දැන්ම ඇඩ් කළා) */
  getDietPlan(email: string): Observable<any> {
    return this.http.get<any>(`${this.aiUrl}/diet-plan`, {
      params: { email: email }
    });
  }
}