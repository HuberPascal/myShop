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

@Injectable()
export class CartEffects {
  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      withLatestFrom(this.store.select((state) => state.cartReducer?.cartId)),
      tap((action) => console.log('Action received:', action)),
      mergeMap(([action, cartId]) => {
        const myDataForBackend = new CartItem({
          productId: action.productId,
          cartId: cartId ? Number(cartId) : null,
          quantity: 1,
        });

        return this.apiService.cartItem(myDataForBackend).pipe(
          tap((cartItem) => console.log('CartItem added:', cartItem)),
          map((cartItem) => CartActions.addToCartSuccess({ cartItem })),
          catchError((error) =>
            of(CartActions.loadCartFailure({ error: error.message }))
          )
        );
      })
    )
  );

  // addItemToCart$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(addToCart),
  //     tap((action) => console.log('Action received:', action)),
  //     mergeMap((action) => {
  //       let cartId = this.cartService.getCartId();

  //       if (!cartId) {
  //         console.log('Keine CartId vorhanden, erstelle neuen Warenkorb...');
  //         // TODO: userId dynamisch setzen
  //         return this.cartService.createCart(56756).pipe(
  //           tap((newCartId) => {
  //             console.log('Neue CartId erhalten:', newCartId);
  //           }),
  //           switchMap((newCart) => {
  //             const cartItem = new CartItem({
  //               productId: action.productId,
  //               quantity: action.quantity,
  //               cartId: newCart.id,
  //             });
  //             console.log('Sende CartItem an API:', cartItem);
  //             return this.apiService.cartItem(cartItem).pipe(
  //               map(() =>
  //                 CartActions.loadCardSuccess({ productId: action.productId })
  //               ),
  //               catchError((error) =>
  //                 of(CartActions.loadCartFailure({ error: error.message }))
  //               )
  //             );
  //           })
  //         );
  //       } else {
  //         console.log('Verwende bestehende CartId:', cartId);
  //         const cartItem = new CartItem({
  //           productId: action.productId,
  //           quantity: action.quantity,
  //           cartId: cartId,
  //         });
  //         console.log('Sende CartItem an API:', cartItem);
  //         return this.apiService.cartItem(cartItem).pipe(
  //           map(() =>
  //             CartActions.loadCardSuccess({ productId: action.productId })
  //           ),
  //           catchError((error) =>
  //             of(CartActions.loadCartFailure({ error: error.message }))
  //           )
  //         );
  //       }
  //     })
  //   )
  // );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private cartService: CartService,
    private store: Store<{ cartReducer: { cartId: string } }>
  ) {}
}

type foo = {
  bar: string;
};

type bar = {
  baz: number;
};

type kek = bar & foo;

type alllowedStrings = 'yes' | 'no';

type partKek = Partial<kek>;

const p: partKek = {
  bar: 'string',
};

interface bim {}

interface bim {
  id: number;
  boom: number;
  foo: string;
}
