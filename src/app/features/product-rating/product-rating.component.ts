import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Product } from '../store/product.model';

@Component({
  selector: 'app-product-rating',
  imports: [CommonModule],
  templateUrl: './product-rating.component.html',
  styleUrl: './product-rating.component.scss',
})
export class ProductRatingComponent {
  @Input() productRating: Product['rating'] | undefined;
  // @Input() productRatingCount: Product['numberOfRating'] | undefined;

  productsRating = [
    { id: 1, name: 'Produkt A', rating: 2.5 },
    { id: 2, name: 'Produkt B', rating: 1.5 },
    { id: 3, name: 'Produkt C', rating: 4.5 },
  ];
}
