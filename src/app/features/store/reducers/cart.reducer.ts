import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../../api/api-client';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: { productId: number; cartId: any; quantity: number }[]; // Speichere Produkt-Details
  error: any;
  loading: boolean;
  cartId?: any; // Add cartId property
}
export const initialState: CartState = {
  items: [],
  error: null,
  loading: false,
  cartId: null, // Initialize cartId
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCartSuccess, (state, { cartItem }) => ({
    ...state,
    items: [
      ...state.items.filter((item) => item.productId !== cartItem.productId),
      {
        productId:
          cartItem.productId !== undefined
            ? cartItem.productId
            : state.items[0].productId,
        cartId: cartItem.cartId ?? state.cartId, // Falls cartItem.cartId undefined ist, behalte den vorherigen Wert aus dem State
        quantity: cartItem.quantity !== undefined ? cartItem.quantity : 0,
      },
    ],
    cartId: cartItem.cartId ?? state.cartId, // Aktualisiere cartId im State, falls vorhanden
  }))
);
