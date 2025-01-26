import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Product } from '../../store/product.model';
import { loadProducts } from '../../store/product.actions';
import { ProductRatingComponent } from '../../../product-rating/product-rating.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-carousel',
  imports: [
    MatIconModule,
    MatTooltipModule,
    CommonModule,
    ProductRatingComponent,
    RouterLink,
  ],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss',
})
export class ProductCarouselComponent implements OnInit {
  @ViewChild('productScrollContainer', { static: false })
  scrollContainer!: ElementRef;
  private scrollAmount = 1000;

  products$: Observable<Product[]> | undefined;

  constructor(private store: Store<{ data: { products: Product[] } }>) {
    this.products$ = store.select((state) => state.data.products);
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts());
  }

  // productsRating = [
  //   { id: 1, name: 'Produkt A', rating: 2.5 },
  //   { id: 2, name: 'Produkt B', rating: 1.5 },
  //   { id: 3, name: 'Produkt C', rating: 4.5 },
  // ];

  scroll(direction: 'left' | 'right'): void {
    const container = this.scrollContainer.nativeElement as HTMLElement;
    const scrollOptions: ScrollToOptions = {
      behavior: 'smooth',
      left:
        direction === 'left'
          ? container.scrollLeft - this.scrollAmount
          : container.scrollLeft + this.scrollAmount,
    };

    container.scrollTo(scrollOptions);
  }
}
