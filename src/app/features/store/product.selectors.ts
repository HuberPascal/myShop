import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ProductState } from './product.reducer';

// Holt `data` aus dem Store
export const selectProductState = createFeatureSelector<ProductState>('data');

// Holt nur `products`
export const selectProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products
);

export const selectProductIsLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading
);
