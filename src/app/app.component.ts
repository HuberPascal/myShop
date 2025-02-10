import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { Store } from '@ngrx/store';
import { loadProducts } from './features/store/product.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'myShop';

  private router = inject(Router);
  private store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(loadProducts()); 
  }
}
