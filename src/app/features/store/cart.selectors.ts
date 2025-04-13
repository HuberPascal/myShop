import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './reducers/product.reducer';
import { AppState } from './app.state';
import { CartState } from './reducers/cart.reducer';

// Holt den Product-State aus dem globalen Store
// Der Name 'data' muss mit dem Schlüssel in der reducers-Map übereinstimmen
export const selectCartState = createFeatureSelector<AppState, CartState>(
  'cart'
);

export const selectCartId = createSelector(
  selectCartState,
  (state: CartState) => state.cartId
);
