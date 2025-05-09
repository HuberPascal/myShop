import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { Product } from '../store/product.model';
import { map, Observable } from 'rxjs';
import { ProductRatingComponent } from '../product-rating/product-rating.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { selectProducts } from '../store/product.selectors';
import { AvailableContainerComponent } from '../available-container/available-container.component';
import { addToCart } from '../store/actions/cart.actions';
import { ICartItem } from '../../api/api-client';
import { AppState } from '../store/app.state';

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
  destroyRef = inject(DestroyRef);

  constructor(private route: ActivatedRoute, private store: Store<AppState>) {}

  ngOnInit(): void {
    const productId = Number(this.route.snapshot.paramMap.get('id'));

    this.product$ = this.store
      .select(selectProducts)
      
      .pipe(
        map((products) =>
          products.find((product: any) => product.id === productId)
        )
      );
  }

  addToCart() {
    const productId: number = parseInt(
      this.route.snapshot.paramMap.get('id') || '0'
    );
    if (productId) {
      console.log('Product ID:', Number(productId));
      this.store.dispatch(addToCart({ productId: productId }));
    }
  }
}
