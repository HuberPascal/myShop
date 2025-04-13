import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ApiService } from '../../../Core/services/api.service';
import {
  addProduct,
  deleteProduct,
  loadProducts,
  loadProductsFailure,
  updateProduct,
} from '../actions/product.actions';
import * as ProductActions from '../actions/product.actions';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.apiService.productAll().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addProduct),
      mergeMap((action) =>
        this.apiService.productPOST(action.product).pipe(
          map((product) => ProductActions.addProductSuccess({ product })),
          catchError((error) => {
            console.error('Fehler beim Hinzufügen des Produkts', error);
            return of(
              ProductActions.addProductFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  editProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap((action) =>
        this.apiService.productPUT(action.id, action.product).pipe(
          tap((product) => console.log('Produkt bearbeiten', product)),
          map((product) => ProductActions.updateProductSuccess({ product })),
          catchError((error) => {
            console.error('Fehler beim Bearbeiten des Produkts', error);
            return of(
              ProductActions.updateProductFailure({ error: error.message })
            );
          })
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap((action) =>
        this.apiService.productDELETE(action.id).pipe(
          tap((product) => console.log('Produkt hinzufügen', product)),
          map(() => ProductActions.deleteProductSuccess({ id: action.id }))
        )
      )
    )
  );

  constructor(private actions$: Actions, private apiService: ApiService) {}
}
