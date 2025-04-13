import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiClient } from '../../api/api-client';

@Injectable({
  providedIn: 'root',
})
export class ApiService extends ApiClient {
  constructor(http: HttpClient) {
    super(http, 'http://localhost:5047'); // API-URL hier anpassen
  }
}
