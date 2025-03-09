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
  // Aktion beim Start des Hinzufügens
  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  // Erfolgreiche Hinzufügen-Aktion
  on(CartActions.addToCartSuccess, (state, { cartItem }) => ({
    ...state,
    loading: false,
    items: [
      ...state.items.filter((item) => item.productId !== cartItem.productId),
      {
        productId:
          cartItem.productId !== undefined
            ? cartItem.productId
            : state.items.length > 0
            ? state.items[0].productId
            : 0, // Verhindere Zugriff auf leeres Array
        cartId: cartItem.cartId ?? state.cartId,
        quantity: cartItem.quantity !== undefined ? cartItem.quantity : 1, // Default zu 1 statt 0
      },
    ],
    cartId: cartItem.cartId ?? state.cartId,
  })),

  // Fehlerbehandlung
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
