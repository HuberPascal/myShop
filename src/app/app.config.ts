import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from './app.routes';
import { metaReducers, reducers } from './features/store';
import { CartEffects } from './features/store/effects/cart.effect';
import { ProductEffects } from './features/store/effects/products.effect';

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
      logOnly: false, // Set to true for production
    }),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
