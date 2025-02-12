import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { Store } from '@ngrx/store';
import { loadProducts } from './features/store/product.actions';
import { AdminComponent } from './features/admin/admin.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent, AdminComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'myShop';

  isAdminPage = false;

  private store = inject(Store);

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.isAdminPage = this.router.url.includes("/admin");
    })
  }

  ngOnInit(): void {
    this.store.dispatch(loadProducts()); 

  }
}
