import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../sidebar/sidebar.component';

import { ProductCarouselComponent } from '../products/product-carousel/product-carousel.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, ProductCarouselComponent, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {}
