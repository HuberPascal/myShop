import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadProducts } from '../store/actions/product.actions';

@Component({
  selector: 'app-admin',
  imports: [MatButtonModule, RouterLink, RouterModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit {
  store = inject(Store);

  onProductAdded(product: any) {
    console.log('Produkt erhalten im Parent:', product);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }
}
