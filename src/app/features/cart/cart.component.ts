import { Component, inject, NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { AvailableContainerComponent } from '../available-container/available-container.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { loadCart } from '../store/actions/cart.actions';

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
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  store = inject(Store);

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

  saveCartItems() {
    this.store.dispatch(loadCart());
  }

  getCartContent() {}
}
