import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { loadProducts } from './features/store/actions/product.actions';
import { HeaderComponent } from './features/header/header.component';
import { NavComponent } from './nav/nav.component';
import { AppState } from './features/store';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'myShop';
  isAdminPage = false;
  private productsLoaded = false; // Flag, um zu tracken, ob Produkte bereits geladen wurden
  private store = inject(Store<AppState>);

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.includes('/admin');
    });
  }

  ngOnInit(): void {
    // Prüfe, ob wir bereits Produkte geladen haben
    // if (!this.productsLoaded) {
    //   this.store.dispatch(loadProducts());
    //   this.productsLoaded = true;
    // }
    // (window as any).productsDebug = of();
  }
}
