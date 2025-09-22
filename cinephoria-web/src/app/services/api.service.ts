import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = 'http://127.0.0.1:8000';

  getLastWednesdayMovies() {
    return this.http.get<any[]>(`${this.base}/movies?added=last_wednesday`);
  }
  getAllMovies() {
    return this.http.get<any[]>(`${this.base}/movies`);
  }
}
