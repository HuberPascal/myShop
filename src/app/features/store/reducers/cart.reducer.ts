import { createReducer, on } from '@ngrx/store';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: {
    productId: number;
    cartId: number;
    quantity: number;
  }[];
  error: any;
  loading: boolean;
  cartId: number | undefined; // Add cartId property
}
export const initialState: CartState = {
  items: [],
  error: null,
  loading: false,
  cartId: 0, // Initialize cartId
};

export const cartReducer = createReducer(
  initialState,
  // Aktion beim Start des Hinzufügens
  on(CartActions.addToCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CartActions.createCartSuccess, (state, { cartId }) => ({
    ...state,
    cartId: cartId.cartId,
  })),

  // Erfolgreiche Hinzufügen-Aktion
  on(CartActions.addToCartSuccess, (state, { cartItem }) => ({
    ...state,
    loading: false,
    items: [
      ...state.items,
      {
        productId: cartItem.productId ?? 0,
        cartId: cartItem.cartId ?? 0,
        quantity: cartItem.quantity !== undefined ? cartItem.quantity : 1,
      },
    ],
    cartId: cartItem.cartId ?? 0,
    error: null,
  })),

  // Fehlerbehandlung
  on(CartActions.addToCartFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
