import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './reducers/product.reducer';
import { AppState } from './app.state';

// Holt den Product-State aus dem globalen Store
// Der Name 'data' muss mit dem Schlüssel in der reducers-Map übereinstimmen
export const selectProductState = createFeatureSelector<AppState, ProductState>(
  'product'
);

// Holt nur `products`
export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductIsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);
