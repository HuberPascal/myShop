import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class ProductCarouselComponent {
  @Input() products$!: Observable<Product[]>;
  @ViewChild('productScrollContainer', { static: false })
  scrollContainer!: ElementRef;
  private scrollAmount = 1000;


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
