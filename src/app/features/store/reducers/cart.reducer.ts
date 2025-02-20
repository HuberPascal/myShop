import { createReducer, on } from '@ngrx/store';
import { Cart } from '../../../api/api-client';
import * as CartActions from '../actions/cart.actions';

export interface CartState {
  items: number[]; // Nur die Produkt-IDs werden gespeichert
  error: any;
  loading: boolean;
}

export const initialState: CartState = {
  items: [],
  error: null,
  loading: false,
};

export const cartReducer = createReducer(
  initialState,
  on(CartActions.addToCartSuccess, (state, { productId }) => ({
    ...state,
    items: [...state.items, productId], // Fügt die ID dem Array hinzu
  }))
);
