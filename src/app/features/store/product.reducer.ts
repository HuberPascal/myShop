import { createReducer, on } from '@ngrx/store';
// Importiere die NgRx-Funktionen zum Erstellen eines Reducers und für die Verarbeitung von Actions.

import { loadProductsSuccess, loadProductsFailure } from './product.actions';
// Importiere die Actions, die der Reducer verarbeiten soll.

import { Product } from './product.model';
// Importiere das Product-Modell, das die Struktur eines Produkts definiert.

export interface ProductState {
  products: Product[]; // Ein Array von Produkten, das den Zustand der Produktliste darstellt.
  error: any; // Ein Fehlerobjekt, das Fehlerinformationen enthält, falls etwas schiefgeht.
}

export const initialState: ProductState = {
  products: [], // Der anfängliche Zustand der Produktliste ist ein leeres Array.
  error: null, // Zu Beginn gibt es keine Fehler, daher ist der Fehlerzustand null.
};

export const productReducer = createReducer(
  initialState,
  // Der `initialState` ist der Ausgangspunkt des Reducers und repräsentiert den Anfangszustand des Stores.

  on(loadProductsSuccess, (state, { products }) => ({
    // Wenn die Action `loadProductsSuccess` ausgeführt wird:
    ...state, // Behalte den aktuellen Zustand bei.
    products, // Aktualisiere die Produktliste mit den neuen Produkten.
    error: null, // Setze den Fehlerzustand auf `null`, da die Aktion erfolgreich war.
  })),

  on(loadProductsFailure, (state, { error }) => ({
    // Wenn die Action `loadProductsFailure` ausgeführt wird:
    ...state, // Behalte den aktuellen Zustand bei.
    error, // Speichere die Fehlerinformationen im Zustand.
  }))
);
// Der Reducer verarbeitet die Actions und gibt einen neuen Zustand zurück.
// Er bleibt unveränderlich (immutable), daher wird immer ein neuer Zustand erzeugt.
