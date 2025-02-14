import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

import { ProductCarouselComponent } from '../products/product-carousel/product-carousel.component';
import { Observable } from 'rxjs';
import { Product } from '../store/product.model';
import { Store } from '@ngrx/store';
import { selectProducts } from '../store/product.selectors';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductCarouselComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  products$: Observable<Product[]>;

  constructor(private store: Store<{ products: Product[]}>) {

    this.products$ = this.store.select(selectProducts);
  }
}
