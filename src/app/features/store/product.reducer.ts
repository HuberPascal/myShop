import { createReducer, on } from '@ngrx/store';
// Importiere die NgRx-Funktionen zum Erstellen eines Reducers und für die Verarbeitung von Actions.

import * as ProductActions from './product.actions';
// Importiere die Actions, die der Reducer verarbeiten soll.

import { Product } from './product.model';
// Importiere das Product-Modell, das die Struktur eines Produkts definiert.

export interface ProductState {
  products: Product[]; // Ein Array von Produkten, das den Zustand der Produktliste darstellt.
  error: any; // Ein Fehlerobjekt, das Fehlerinformationen enthält, falls etwas schiefgeht.
  loading: boolean; // 🔥 Neu: Gibt an, ob das Laden gerade aktiv ist.
}

export const initialState: ProductState = {
  products: [], // Der anfängliche Zustand der Produktliste ist ein leeres Array.
  error: null, // Zu Beginn gibt es keine Fehler, daher ist der Fehlerzustand `null`.
  loading: false // 🔥 Neu: Zu Beginn wird nichts geladen.
};

export const productReducer = createReducer(
  initialState,

  // Wenn die Action `loadProducts` ausgeführt wird:
  on(ProductActions.loadProducts, state => ({
    ...state, // Behalte den aktuellen Zustand bei.
    loading: true, // 🔥 Ladeprozess beginnt, also `loading: true`
    error: null // Falls vorher ein Fehler war, wird er zurückgesetzt.
  })),

  // Wenn die Action `loadProductsSuccess` ausgeführt wird:
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state, // Behalte den aktuellen Zustand bei.
    products, // Aktualisiere die Produktliste mit den neuen Produkten.
    loading: false, // 🔥 Ladeprozess abgeschlossen
    error: null // Setze den Fehlerzustand auf `null`, da die Aktion erfolgreich war.
  })),

  // Wenn die Action `loadProductsFailure` ausgeführt wird:
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state, // Behalte den aktuellen Zustand bei.
    loading: false, // 🔥 Ladeprozess fehlgeschlagen
    error // Speichere die Fehlerinformationen im Zustand.
  }))
);
// Der Reducer verarbeitet die Actions und gibt einen neuen Zustand zurück.
// Er bleibt unveränderlich (immutable), daher wird immer ein neuer Zustand erzeugt.
