import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
  <section class="container py-4">
    <h1 class="h4 mb-3">Contact</h1>

    <form [formGroup]="form" (ngSubmit)="submit()" class="row g-3">
      <div class="col-md-6">
        <label class="form-label">Nom</label>
        <input class="form-control" formControlName="name">
        <div class="text-danger small" *ngIf="t('name')">Nom requis (2–60)</div>
      </div>

      <div class="col-md-6">
        <label class="form-label">Email</label>
        <input class="form-control" formControlName="email" type="email">
        <div class="text-danger small" *ngIf="t('email')">Email valide requis</div>
      </div>

      <div class="col-12">
        <label class="form-label">Message</label>
        <textarea class="form-control" rows="5" formControlName="message"></textarea>
        <div class="text-danger small" *ngIf="t('message')">Message (10–1000 caractères)</div>
      </div>

      <div class="col-12 d-flex gap-2">
        <button class="btn btn-primary" type="submit" [disabled]="form.invalid || sending">
          {{ sending ? 'Envoi…' : 'Envoyer' }}
        </button>
        <button class="btn btn-outline-secondary" type="button" (click)="reset()">Réinitialiser</button>
      </div>

      <div class="alert alert-success mt-3" *ngIf="ok">Message envoyé ✔️</div>
      <div class="alert alert-danger mt-3" *ngIf="error">Oups, une erreur est survenue.</div>
    </form>
  </section>
  `
})
export class ContactComponent {
  form!: FormGroup;
  sending = false;
  ok = false;
  error = false;
  readonly defaults = { name: '', email: '', message: '' };

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      email: ['', [Validators.required, Validators.email]] ,
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
    });
  }

  t(c: string) { const ctrl = this.form.get(c)!; return ctrl.touched && ctrl.invalid; }
  reset(){ this.form.reset(this.defaults); this.ok = this.error = false; }

  submit(){
    if (this.form.invalid){ this.form.markAllAsTouched(); return; }
    this.sending = true; this.ok = this.error = false;
    this.api.postContact(this.form.value).subscribe({
      next: () => { this.ok = true; this.sending = false; },
      error: () => { this.error = true; this.sending = false; }
    });
  }
}
