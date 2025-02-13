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
  
} from './product.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.apiService.productAll().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  addProduct$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addProduct),
    mergeMap((action) =>
      this.apiService.productPOST(action.product).pipe(
        tap((product) => console.log("Produkt hinzufügen", product)),
        map((product) =>ProductActions.addProductSuccess({ product })),
        catchError((error) => of(addProductFailure({ error: error.message })))
      )
    )
  ))

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private apiService: ApiService
  ) {}
}
