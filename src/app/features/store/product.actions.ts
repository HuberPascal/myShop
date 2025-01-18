import { createAction, props } from '@ngrx/store';
import { Product } from './product.model';

// Action zum Laden der Produkte
export const loadProducts = createAction('[Product] Load Products');

// Action, die bei erfolgreichem Laden der Produkte ausgelöst wird
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[] }>()
);

// Action, die bei einem Fehler beim Laden der Produkte ausgelöst wird
export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: any }>()
);
