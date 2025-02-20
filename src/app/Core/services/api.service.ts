import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from '../../api/api-client';
import { Product } from '../../features/store/product.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends ApiClient {
  constructor(http: HttpClient) {
    super(http, 'https://localhost:7137'); // API-URL hier anpassen
  }

  //   getProducts(): Observable<Product[]> {
  //     return this.http.get<Product[]>(this.baseUrl + '/api/products');
  //   }
  // TODO: löschen?
  addProductsToDatabase(product: any) {
    // Product ergibt einen Fehler
    console.log('product in apiService', product);
    this.productPOST(product); // wie kann ich das produkt an den ApiCLient senden?
  }
}
