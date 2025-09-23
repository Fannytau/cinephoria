import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './films.component.html',
})
export class FilmsComponent {
  constructor(private api: ApiService) {
    // recharge quand les filtres changent
    effect(() => { this.load(); });
  }

  // filtres
  q = signal<string>('');
  min = signal<number | null>(null);
  fav = signal<boolean>(false);

  movies: any[] = [];
  loading = false;

  load() {
    this.loading = true;
    this.api.getMovies({
      q: this.q().trim() || undefined,
      min_rating: this.min() ?? undefined,
      fav_only: this.fav() || undefined
    }).subscribe({
      next: (res: any[]) => { this.movies = res; this.loading = false; },
      error: () => { this.movies = []; this.loading = false; }
    });
  }
}
