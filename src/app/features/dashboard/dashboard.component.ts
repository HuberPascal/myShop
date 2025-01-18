import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductCarouselComponent } from '../products/product-carousel/product-carousel.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductCarouselComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
