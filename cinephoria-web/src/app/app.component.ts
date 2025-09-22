import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`
})
export class AppComponent {}
