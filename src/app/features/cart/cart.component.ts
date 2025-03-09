import { Component, inject, NgModule, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AvailableContainerComponent } from '../available-container/available-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { loadCart } from '../store/actions/cart.actions';
import { cartReducer } from '../store/reducers/cart.reducer';
import {
  Observable,
  Observer,
  of,
  combineLatest,
  map,
  Subscription,
} from 'rxjs';
import { ICartItem } from '../../api/api-client';
import { CommonModule } from '@angular/common';

interface Amount {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-cart',
  imports: [
    AvailableContainerComponent,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule,
    CommonModule,
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  store = inject(Store);
  cartProducts$: Observable<any[]> = of([]);
  private subscription = new Subscription();

  ngOnInit(): void {
    this.store.dispatch(loadCart());

    // Selektiere Cart-Items und Produkte aus dem Store
    const cartItems$ = this.store.select((state) => state.cart.items);
    const products$ = this.store.select((state) => state.product?.products);

    // Debug-Ausgabe für Produkte
    this.subscription.add(
      products$.subscribe((products) => {
        console.log('Products aus dem Store:', products);
      })
    );

    // Kombiniere die beiden Observables
    this.cartProducts$ = combineLatest({
      cartItems: cartItems$,
      products: products$,
    }).pipe(
      map(({ cartItems, products }) => {
        // Extrahiere nur die Produkte für die Cart-Items
        return cartItems.map((cartItem: { productId: any }) => {
          const product = products?.find(
            (p: { id: any }) => p && p.id === cartItem.productId
          );

          // Füge die Quantity-Information zum Produkt hinzu, falls du sie brauchst
          return {
            ...product,
          };

          // Oder wenn du nur das reine Produkt willst, ohne zusätzliche Cart-Infos:
          // return product;
        });
      })
    );

    // HIER IST DIE WICHTIGE ÄNDERUNG:
    // Abonniere das Endergebnis und gib es aus
    this.subscription.add(
      this.cartProducts$.subscribe(
        (finalResult) => {
          console.log('Endgültig in cartProducts$ gespeichert:', finalResult);
          // Tiefergehende Analyse jedes Elements
          if (Array.isArray(finalResult)) {
            finalResult.forEach((item, index) => {
              console.log(`Element ${index}:`, item);
              console.log(`Produkt in Element ${index}:`, item.productId);
            });
          }
        },
        (error) => console.error('Fehler in cartProducts$:', error)
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  amounts: Amount[] = [
    { value: '1', viewValue: '1' },
    { value: '2', viewValue: '2' },
    { value: '3', viewValue: '3' },
    { value: '4', viewValue: '4' },
    { value: '5', viewValue: '5' },
  ];

  selectedAmount: string = '1';
  customAmount: number | null = null;

  checkCustomAmount() {
    if (this.selectedAmount !== 'custom') {
      this.customAmount = null;
    }
  }

  // saveCartItems() {
  //   this.store.dispatch(loadCart());
  // }

  getCartContent() {}
}
