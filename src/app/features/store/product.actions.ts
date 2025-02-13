import { createAction, props } from '@ngrx/store';
// import { Product } from './product.model';
import { Product } from '../../api/api-client';


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

export const addProduct = createAction(
  '[Product] Add Product',
  props<{ product: Product}>()
);

export const addProductSuccess = createAction(
  '[Product] Add Product Success',
  props<{ product: Product}>()
);

export const addProductFailure = createAction(
  '[Product] Add Product Success',
  props<{ error: any}>()
);

export const ProductsActions = {
  addProduct,
  addProductSuccess,
  addProductFailure
};