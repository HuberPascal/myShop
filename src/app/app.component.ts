import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { loadProducts } from './features/store/actions/product.actions';
import { HeaderComponent } from './features/header/header.component';
import { NavComponent } from './nav/nav.component';
import { AppState } from './features/store/app.state';
import { ApiService } from './Core/services/api.service';
import { createCart } from './features/store/actions/cart.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'myShop';
  isAdminPage = false;
  userId = 1;
  private store = inject(Store<AppState>);

  constructor(private router: Router, private apiService: ApiService) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.includes('/admin');
    });
  }

  ngOnInit(): void {
    this.store.dispatch(createCart({ userId: this.userId }));
  }
}
