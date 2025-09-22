import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <section class="container py-4">
    <h1 class="h4 mb-3">Tous les films</h1>

    <form class="row g-2 align-items-end mb-3">
      <div class="col-sm-6 col-md-4">
        <label class="form-label">Recherche par titre</label>
        <input class="form-control" [(ngModel)]="q" name="q" (ngModelChange)="applyFilters()" placeholder="ex: Eau">
      </div>
      <div class="col-sm-3 col-md-2">
        <label class="form-label">Note min</label>
        <input type="number" class="form-control" [(ngModel)]="minRating" name="minRating" (ngModelChange)="applyFilters()" step="0.1" min="0" max="5">
      </div>
      <div class="col-sm-3 col-md-2 form-check ms-2">
        <input id="fav" type="checkbox" class="form-check-input" [(ngModel)]="onlyFav" name="onlyFav" (change)="applyFilters()">
        <label for="fav" class="form-check-label">Favoris seulement</label>
      </div>
      <div class="col-auto">
        <button type="button" class="btn btn-outline-secondary" (click)="resetFilters()">Réinitialiser</button>
      </div>
    </form>

    <div *ngIf="filtered?.length; else empty" class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
      <div class="col" *ngFor="let m of filtered">
        <div class="card h-100">
          <img *ngIf="m.poster_url" [src]="m.poster_url" class="card-img-top" [alt]="m.title">
          <div class="card-body">
            <h2 class="h6 card-title">{{ m.title }}</h2>
            <p class="card-text small">{{ m.description }}</p>
            <div class="d-flex justify-content-between small text-muted">
              <span>Âge min: {{ m.age_min }}</span>
              <span>Note: {{ m.rating | number:'1.1-1' }}/5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ng-template #empty>
      <p class="text-muted">Aucun film.</p>
    </ng-template>
  </section>
  `
})
export class FilmsComponent implements OnInit {
  private api = inject(ApiService);
  all: any[] = [];
  filtered: any[] = [];
  q = '';
  minRating: number | null = null;
  onlyFav = false;

  ngOnInit() {
    this.api.getAllMovies().subscribe(list => {
      this.all = list;
      this.applyFilters();
    });
  }

  applyFilters() {
    const q = this.q.trim().toLowerCase();
    const minR = this.minRating ?? -Infinity;
    this.filtered = this.all.filter(m =>
      (q ? m.title.toLowerCase().includes(q) : true) &&
      (m.rating >= minR) &&
      (this.onlyFav ? m.is_favorite : true)
    );
  }

  resetFilters() {
    this.q = '';
    this.minRating = null;
    this.onlyFav = false;
    this.applyFilters();
  }
}
