import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="container py-4">
    <h1 class="h4 mb-3">Réservation</h1>

    <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nom</label>
        <input class="form-control" formControlName="name">
        <div class="text-danger small" *ngIf="touched('name')">Nom requis (2–60)</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input class="form-control" formControlName="email" type="email">
        <div class="text-danger small" *ngIf="touched('email')">Email valide requis</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Film</label>
        <input class="form-control" formControlName="movie" placeholder="ex: Eau & Feu">
      </div>

      <div class="col-md-3">
        <label class="form-label">Date</label>
        <input class="form-control" formControlName="date" type="date">
      </div>

      <div class="col-md-3">
        <label class="form-label">Places</label>
        <input class="form-control" formControlName="seats" type="number" min="1" max="10">
      </div>

      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || loading">
          {{ loading ? 'Envoi…' : 'Réserver' }}
        </button>
        <button class="btn btn-outline-secondary" type="button" (click)="reset()">Réinitialiser</button>
      </div>

      <div class="alert alert-success mt-3" *ngIf="success">Réservation enregistrée ✔️</div>
      <div class="alert alert-danger mt-3" *ngIf="error">Oups, une erreur est survenue.</div>
    </form>
  </section>
  `
})
export class ReservationComponent {
  form!: FormGroup;
  loading = false;
  success = false;
  error = false;
  readonly defaults = { name: '', email: '', movie: '', date: '', seats: 1 };

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]],
      movie: ['', Validators.required],
      date: ['', Validators.required],
      seats: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
    });
  }

  touched(ctrl: string) { const c = this.form.get(ctrl)!; return c.touched && c.invalid; }
  reset() { this.form.reset(this.defaults); this.success = this.error = false; }

  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true; this.success = this.error = false;
    this.api.postReservation(this.form.value).subscribe({
      next: () => { this.success = true; this.loading = false; },
      error: () => { this.error = true; this.loading = false; }
    });
  }
}
