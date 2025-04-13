import { Component } from '@angular/core';
import { Product } from '../../api/api-client';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/product.selectors';
import { Observable, map } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppState } from '../store/app.state';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  product$: Observable<Product | undefined>;

  constructor(private store: Store<AppState>) {
    this.product$ = this.store.select(selectProducts).pipe(
      map((products) => {
        if (products.length === 0) return undefined;
        const randomIndex = Math.floor(Math.random() * products.length);
        return products[randomIndex]; // Wählt ein zufälliges Produkt aus
      })
    );
  }
}
// TODO: aktionspreis berechnen
// TODO: Stückzahlen
