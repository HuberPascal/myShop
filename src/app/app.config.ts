import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './features/store/products.effect';
import { productReducer } from './features/store/product.reducer';
import { provideHttpClient } from '@angular/common/http';
import { CartEffects } from './features/store/effects/cart.effect';
import { cartReducer } from './features/store/reducers/cart.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ data: productReducer, cartReducer }),
    provideEffects(ProductEffects, CartEffects),
    provideStoreDevtools(),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
