import {
  ApplicationConfig,
  isDevMode,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers, reducers } from './features/store/app.state';
import { CartEffects } from './features/store/effects/cart.effect';
import { ProductEffects } from './features/store/effects/products.effect';
import { productReducer } from './features/store/reducers/product.reducer';
import { cartReducer } from './features/store/reducers/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    // provideStore({ data: productReducer, cartReducer }),
    provideStore(reducers, { metaReducers }),
    provideEffects(ProductEffects, CartEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
