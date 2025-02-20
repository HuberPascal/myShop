import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from '../../../Core/services/api.service';
import * as CardActions from '../actions/cart.actions';
import { mergeMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../../../Core/services/cart.service';
import { addToCart } from '../actions/cart.actions';

@Injectable()
export class CartEffects {
  addItemToCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addToCart),
      tap((action) => console.log('Action received:', action)),
      mergeMap((action) => {
        console.log(
          'Creating CartItem with:',
          action.productId,
          action.quantity
        );

        const cartItem = this.cartService.createCartItem(
          action.productId,
          action.quantity,
          action.cartId
        );
        console.log('CartItem created:', cartItem);

        return this.apiService.cartItem(cartItem).pipe(
          tap(() => console.log('API request initiated:', cartItem)),
          tap((cartItems) => console.log('API response received:', cartItems)),
          map(() =>
            CardActions.loadCardSuccess({ productId: action.productId })
          ),
          catchError((error) => {
            console.error('Fehler beim Hinzufügen des Produkts', error);
            return of(CardActions.loadCartFailure({ error: error.message }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private cartService: CartService
  ) {}
}
//   addProduct$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(addProduct),
//       mergeMap((action) =>
//         this.apiService.productPOST(action.product).pipe(
//           tap((product) => console.log('Produkt hinzufügen', product)),
//           map((product) => ProductActions.addProductSuccess({ product })),
//           catchError((error) => {
//             console.error('Fehler beim Hinzufügen des Produkts', error);
//             return of(
//               ProductActions.addProductFailure({ error: error.message })
//             );
//           })
//         )
//       )
//     )
//   );
