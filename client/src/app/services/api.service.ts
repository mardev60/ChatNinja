import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = 'http://localhost:3000';

  constructor(private http : HttpClient) {}

  get<T>(endpoint: string, headers?: HttpHeaders) {
    const options = headers ? { headers } : {};
    return this.http.get<T>(`${this.url}/${endpoint}`, options);
  }

  post<T>(endpoint: string, body: any) {
    return this.http.post<T>(`${this.url}/${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any) {
    return this.http.put<T>(`${this.url}/${endpoint}`, body);
  }

  delete<T>(endpoint: string) {
    return this.http.delete<T>(`${this.url}/${endpoint}`);
  }
}
