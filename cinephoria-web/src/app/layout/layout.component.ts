import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  // <== ajoute les imports du routeur
  imports: [RouterOutlet, RouterLink],
})
export class LayoutComponent {}
