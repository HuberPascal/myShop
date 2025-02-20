import { Injectable } from '@angular/core';
import { CartItem } from '../../api/api-client';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  createCartItem(
    productId: number,
    quantity: number = 1,
    cartId: number
  ): CartItem {
    return new CartItem({
      productId: productId,
      quantity: quantity,
      cartId: cartId,
    });
  }
}
