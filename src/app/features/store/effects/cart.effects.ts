import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { CartItem } from '../../../api/api-client';
import { ApiService } from '../../../Core/services/api.service';
import { CartService } from '../../../Core/services/cart.service';
import * as CartActions from '../actions/cart.actions';
import { addToCart } from '../actions/cart.actions';
import { productReducer } from '../reducers/product.reducer';
import { selectCartId } from '../cart.selectors';
import { AppState } from '../app.state';

@Injectable()
export class CartEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store<AppState>
  ) {}

  createCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.createCart),
      mergeMap(({ userId }) =>
        this.apiService.cart(userId).pipe(
          map((cartId) => CartActions.createCartSuccess({ cartId })),
          catchError((error) =>
            of(CartActions.createCartFailure({ error: error.message }))
          )
        )
      )
    )
  );

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CartActions.loadCart),
      withLatestFrom(this.store.select((state) => state.cart.cartId)),
      mergeMap(() =>
        this.apiService.cartItemAll().pipe(
          map((cartItems) => CartActions.loadCartSuccess({ cartItems })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      withLatestFrom(this.store.select(selectCartId)),
      tap(([action, cartId]) =>
        console.log('Action received:', action, 'CartId:', cartId)
      ),
      mergeMap(([action, cartId]) => {
        const myDataForBackend = new CartItem({
          productId: action.productId,
          cartId: cartId,
          quantity: 1,
        });

        return this.apiService.cartItem(myDataForBackend).pipe(
          map((cartItem) => CartActions.addToCartSuccess({ cartItem })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        );
      })
    )
  );
}
