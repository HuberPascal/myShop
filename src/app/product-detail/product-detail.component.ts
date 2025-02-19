import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Product } from '../features/store/product.model';
import { map, Observable } from 'rxjs';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { selectProducts } from '../features/store/product.selectors';
import { AvailableContainerComponent } from '../features/available-container/available-container.component';

@Component({
  selector: 'app-product-detail',
  imports: [
    MatButtonModule,
    MatCardModule,
    ProductRatingComponent,
    CommonModule,
    AvailableContainerComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product$: Observable<Product | undefined> | undefined;

  constructor(
    private route: ActivatedRoute,
    private store: Store<{ products: Product[] }>
  ) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.store
      .select(selectProducts)
      .pipe(
        map((products) => products.find((product) => product.id === productId))
      );
  }
}
