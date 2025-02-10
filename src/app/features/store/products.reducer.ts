// import { createReducer, on } from '@ngrx/store';
// import { loadProductsSuccess, loadProductsFailure } from './product.actions';
// import { Product } from './product.model';

// export interface ProductState {
//   products: Product[];
//   error: any;
// }

// export const initialState: ProductState = {
//   products: [],
//   error: null,
// };

// export const productReducer = createReducer(
//   initialState,
//   on(loadProductsSuccess, (state, { products }) => ({
//     ...state,
//     products,
//     error: null,
//   })),
//   on(loadProductsFailure, (state, { error }) => ({
//     ...state,
//     error,
//   }))
// );
