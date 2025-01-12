import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

interface products {
  id: number;
  category: string;
  brand: string;
  name: string;
  productPrice: number;
  basePrice?: string;
  productSpecification: string;
  numberOfRating: number;
  imgSrc: string;
  rating: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatTooltipModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @ViewChild('productScrollContainer', { static: false })
  scrollContainer!: ElementRef;
  private scrollAmount = 1000;

  products = [
    { id: 1, name: 'Produkt A', rating: 2.5 },
    { id: 2, name: 'Produkt B', rating: 1.5 },
    { id: 3, name: 'Produkt C', rating: 4.5 },
  ];

  allProductsBuyAgainSection: products[] = [
    {
      id: 0,
      category: 'Haarmaske',
      brand: 'K18',
      name: 'Molecular Repair',
      productPrice: 45,
      basePrice: '920.-/1l',
      productSpecification: '50 ml',
      numberOfRating: 261,
      imgSrc: 'k18_molecular_repair.avif',
      rating: 5,
    },
    {
      id: 1,
      category: 'Haarmaske',
      brand: 'Davines',
      name: 'Oi - Hair Butter',
      productPrice: 28.25,
      basePrice: '376.66/1l',
      productSpecification: '75 ml',
      numberOfRating: 30,
      imgSrc: 'oi_haar_butter.avif',
      rating: 4.5,
    },
    {
      id: 2,
      category: 'Kaffeebohnen',
      brand: 'Kimbo',
      name: 'Extra Cream',
      productPrice: 24,
      basePrice: '24.-/1kg',
      productSpecification: '1000 g, Mittlere Röstung',
      numberOfRating: 299,
      imgSrc: 'kimbo_extra-cream.avif',
      rating: 4.5,
    },
    {
      id: 3,
      category: 'USB Ladegerät',
      brand: 'digitec',
      name: 'Fast Charger',
      productPrice: 16.9,
      productSpecification: '30 W',
      numberOfRating: 332,
      imgSrc: 'digitec_fast_charger.avif',
      rating: 4.5,
    },
    {
      id: 4,
      category: 'Bluttest',
      brand: 'Abbott',
      name: 'Bluttest',
      productPrice: 77.9,
      productSpecification: 'Blutzuckermessgerät',
      numberOfRating: 40,
      imgSrc: 'abbott_bluttest.avif',
      rating: 4.0,
    },
    {
      id: 5,
      category: 'Wasserfilter',
      brand: 'Brita',
      name: 'Maxtro Pro All-In-1',
      productPrice: 3770,
      productSpecification: '6 x',
      numberOfRating: 4,
      imgSrc: 'brita_maxtro_all_in_1.avif',
      rating: 5.0,
    },
    {
      id: 6,
      category: 'Maus',
      brand: 'Logitech',
      name: 'MX Master 3S',
      productPrice: 83.9,
      productSpecification: 'Kabellos',
      numberOfRating: 1404,
      imgSrc: 'logitech_mx_master_3s.webp',
      rating: 5.0,
    },
    {
      id: 7,
      category: 'Bonbon + Kaugummi',
      brand: 'Haribo',
      name: 'Schlecksäckli sauer',
      productPrice: 2.8,
      productSpecification: '1 Stk., 100g',
      numberOfRating: 26,
      imgSrc: 'haribo_schlecksaeckli_sauer.webp',
      rating: 4.5,
    },
    {
      id: 8,
      category: 'Zahnpasta',
      brand: 'Curaprox',
      name: 'Be you',
      productPrice: 9.7,
      productSpecification: '60 ml',
      numberOfRating: 62,
      imgSrc: 'curaprox_be_you.avif',
      rating: 4.5,
    },
  ];

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
