import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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

  getMovies(params: { q?: string; min_rating?: number; fav_only?: boolean } = {}) {
    let p = new HttpParams();
    if (params.q) p = p.set('q', params.q);
    if (params.min_rating != null) p = p.set('min_rating', String(params.min_rating));
    if (params.fav_only) p = p.set('fav_only', 'true');
    return this.http.get<any[]>(`${this.base}/movies`, { params: p });
  }

  postReservation(body: any) {
    return this.http.post<any>(`${this.base}/reservations`, body);
  }

  postContact(body: any) {
    return this.http.post<any>(`${this.base}/contact`, body);
  }
}
