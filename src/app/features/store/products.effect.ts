import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../Core/services/product.service'; // Statische Produkte
import { ApiService } from '../../Core/services/api.service';
import * as ProductActions from './product.actions';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
  addProduct,
  addProductSuccess,
  addProductFailure,
  deleteProduct,
} from './product.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Product } from '../../api/api-client';
import { HttpClient } from '@angular/common/http';

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
          tap((product) => console.log('Produkt hinzufügen', product)),
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
