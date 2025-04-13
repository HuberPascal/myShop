import { ActionReducerMap, MetaReducer } from '@ngrx/store';

// Importiere alle deine Reducer
import { cartReducer, CartState } from './reducers/cart.reducer';
import { productReducer, ProductState } from './reducers/product.reducer';

export interface AppState {
  cart: CartState;
  product: ProductState;
  // Andere State-Interfaces hier hinzufügen
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  product: productReducer,
  // Andere Reducer hier hinzufügen
};

export const metaReducers: MetaReducer<AppState>[] = [
  // Add actual meta reducers here, e.g., storageMetaReducer
];
// Hier könntest du deine Meta-Reducer wie storageMetaReducer hinzufügen
