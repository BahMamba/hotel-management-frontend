import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private baseUrl = "http://localhost:8080/api/auth";

  register(user: User): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, user);
  }

  login(user: Partial<User>): Observable<AuthResponse>{
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, user);
  }
}
