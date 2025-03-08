// import { createAction, props } from '@ngrx/store';
// import { ICartItem } from '../../../api/api-client';

// export const loadCart = createAction('[Cart] Load Cart');

// export const loadCardSuccess = createAction(
//   '[Cart] Load Cart Success',
//   props<{ productId: number }>()
// );

// export const loadCartFailure = createAction(
//   '[Cart] Load Cart Failure',
//   props<{ error: any }>()
// );

// export const addToCart = createAction(
//   '[Cart] Add to Cart',
//   props<{ productId: number }>()
// );

// export const addToCartSuccess = createAction(
//   '[Cart] Add to Cart Success',
//   props<{ productId: number }>()
// );

import { createAction, props } from '@ngrx/store';
import { ICartItem, ICart } from '../../../api/api-client';

// Warenkorb laden
export const loadCart = createAction('[Cart] Load Cart');

export const loadCartSuccess = createAction(
  '[Cart] Load Cart Success',
  props<{ cart: ICart }>() // Sollte den gesamten Warenkorb enthalten
);

export const loadCartFailure = createAction(
  '[Cart] Load Cart Failure',
  props<{ error: any }>()
);

// Produkt zum Warenkorb hinzufügen
export const addToCart = createAction(
  '[Cart] Add to Cart',
  props<{ productId: number }>() // Falls kein Warenkorb existiert
);

export const addToCartSuccess = createAction(
  '[Cart] Add to Cart Success',
  props<{ cartItem: ICartItem }>() // Sollte das gesamte `ICartItem` zurückgeben
);
