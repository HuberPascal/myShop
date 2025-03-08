import { inject, Injectable } from '@angular/core';
import { Cart, CartItem, ICartItem } from '../../api/api-client';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartId: number | null = null;
  apiService = inject(ApiService);

  // createCartItem(
  //   productId: ICartItem,
  //   quantity: ICartItem,
  //   cartId: ICartItem
  // ): CartItem {
  //   return new CartItem({
  //     productId: productId,
  //     quantity: quantity,
  //     cartId: cartId,
  //   });
  // }

  createCart(userId: number) {
    const cart = new Cart();
    cart.id = 0;
    cart.userId = userId;
    return this.apiService.cart(cart);
  }

  setCartId(cartId: number) {
    this.cartId = cartId;
  }

  getCartId() {
    return this.cartId;
  }
}
