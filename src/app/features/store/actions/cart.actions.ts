import { createAction, props } from '@ngrx/store';

export const loadCart = createAction('[Cart] Load Cart');

export const loadCardSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ productId: number }>()
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ productId: number; quantity: number; cartId: number }>()
);

export const addToCartSuccess = createAction(
  '[Cart] Add to Cart Success',
  props<{ productId: number }>()
);
