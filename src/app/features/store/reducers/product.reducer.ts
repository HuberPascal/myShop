import { createReducer, on } from '@ngrx/store';
// Importiere die NgRx-Funktionen zum Erstellen eines Reducers und für die Verarbeitung von Actions.

import * as ProductActions from '../actions/product.actions';
// Importiere die Actions, die der Reducer verarbeiten soll.

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../../api/api-client';

// Importiere das Product-Modell, das die Struktur eines Produkts definiert.

export interface State extends EntityState<Product> {
  selectedUserId: string | null;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

// export const initialState: State = adapter.getInitialState({
//   selectedUserId: null
// })

export interface ProductState {
  products: Product[]; // Ein Array von Produkten, das den Zustand der Produktliste darstellt.
  error: any; // Ein Fehlerobjekt, das Fehlerinformationen enthält, falls etwas schiefgeht.
  loading: boolean; // Gibt an, ob das Laden gerade aktiv ist.
}

export const initialState: ProductState = {
  products: [], // Der anfängliche Zustand der Produktliste ist ein leeres Array.
  error: null, // Zu Beginn gibt es keine Fehler, daher ist der Fehlerzustand `null`.
  loading: false, // Zu Beginn wird nichts geladen.
};

export const productReducer = createReducer(
  initialState,

  // Wenn die Action `loadProducts` ausgeführt wird:
  on(ProductActions.loadProducts, (state) => ({
    ...state, // Behalte den aktuellen Zustand bei.
    loading: true, // Ladeprozess beginnt, also `loading: true`
    error: null, // Falls vorher ein Fehler war, wird er zurückgesetzt.
  })),

  // Wenn die Action `loadProductsSuccess` ausgeführt wird:
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state, // Behalte den aktuellen Zustand bei.
    products, // Aktualisiere die Produktliste mit den neuen Produkten.
    loading: false, // Ladeprozess abgeschlossen
    error: null, // Setze den Fehlerzustand auf `null`, da die Aktion erfolgreich war.
  })),

  // Wenn die Action `loadProductsFailure` ausgeführt wird:
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, // Behalte den aktuellen Zustand bei.
    loading: false, // Ladeprozess fehlgeschlagen
    error, // Speichere die Fehlerinformationen im Zustand.
  })),

  // on(ProductActions.deleteProduct, (state, {id})) => ({
  //   ...state,
  //   product:
  // })

  // Aktion für das Hinzufügen eines Produkts
  on(ProductActions.addProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product], // Neues Produkt zum Array hinzufügen
  })),

  // on(ProductActions.deleteProductSuccess, (state) => ({
  //   ...state,
  //   products: [...state.products],
  // })),

  on(ProductActions.updateProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.updateProductSuccess, (state, { product }) => ({
    ...state,
    products: state.products.map((p) => (p.id === product.id ? product : p)),
    loading: false,
  })),

  on(ProductActions.deleteProduct, (state) => ({
    ...state,
    loading: true,
  })),

  on(ProductActions.deleteProductSuccess, (state, { id }) => ({
    ...state,
    products: state.products.filter((product) => product.id !== id),
    loading: false,
  })),

  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

// Der Reducer verarbeitet die Actions und gibt einen neuen Zustand zurück.
// Er bleibt unveränderlich (immutable), daher wird immer ein neuer Zustand erzeugt.
