import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartId: number | null = null;
  apiService = inject(ApiService);
}
