import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpHeaders } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userInfo: any = null;

  constructor(private apiService : ApiService) { }

  login(email: string, password: string) {
    return this.apiService.post('auth/login', { email, password });
  }

  register(name: string, email: string, password: string) {
    return this.apiService.post('auth/signup', { name, email, password });
  }

  getUserInfos() {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.apiService.get('auth/me', headers).pipe(
        catchError(() => {
          this.logout();
          return of(null);
        })
      );
    } else {
      throw new Error('No token found');
    }
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  setUserInfo(user: any): void {
    this.userInfo = user;
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  loadUserInfoFromStorage(): void {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
    }
  }

  getUserInfo(): any {
    return this.userInfo;
  }

  clearUserInfo(): void {
    this.userInfo = null;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
