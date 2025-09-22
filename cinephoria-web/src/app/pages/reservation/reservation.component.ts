import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

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
        <div class="text-danger small" *ngIf="form.get('name')?.touched && form.get('name')?.invalid">
          Nom requis (2–60 caractères)
        </div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input class="form-control" formControlName="email" type="email">
        <div class="text-danger small" *ngIf="form.get('email')?.touched && form.get('email')?.invalid">
          Email valide requis
        </div>
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
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid">Réserver</button>
        <button class="btn btn-outline-secondary" type="button" (click)="form.reset(defaults)">Réinitialiser</button>
      </div>

      <div class="alert alert-success mt-3" *ngIf="success">
        Réservation simulée ✔️ (on branchera l’API plus tard).
      </div>
    </form>
  </section>
  `
})
export class ReservationComponent {
  fb = new FormBuilder();
  defaults = { name: '', email: '', movie: '', date: '', seats: 1 };
  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
    email: ['', [Validators.required, Validators.email]],
    movie: ['', Validators.required],
    date: ['', Validators.required],
    seats: [1, [Validators.required, Validators.min(1), Validators.max(10)]],
  });
  success = false;

  submit() {
    if (this.form.valid) {
      console.log('Reservation payload', this.form.value);
      this.success = true;
      setTimeout(() => this.success = false, 2500);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
