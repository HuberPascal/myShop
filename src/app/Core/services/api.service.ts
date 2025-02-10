import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from '../../api/api-client';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends ApiClient {
  constructor(http: HttpClient) {
    super(http, 'https://localhost:7137'); // ✅ API-URL hier anpassen
  }

//   getProducts(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.baseUrl + '/api/products');
//   }
}
