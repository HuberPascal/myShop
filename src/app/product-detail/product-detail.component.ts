import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Product } from '../features/store/product.model';
import { Observable } from 'rxjs';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
    ProductRatingComponent,
    CommonModule,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ data: { products: Product[] } }>
  ) {
    // this.products$ = store.select((state) => state.data.products);
  }

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.store.select((state) =>
      state.data.products.find((product) => product.id === productId)
    );
  }
}
