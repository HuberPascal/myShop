import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { compose } from '@ngrx/store';
import { Component } from '@angular/core';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { AdminComponent } from './features/admin/admin.component';
import { AdminAddProductComponent } from './features/admin-add-product/admin-add-product.component';
import { AdminDeleteProductComponent } from './features/admin-delete-product/admin-delete-product.component';
import { AdminEditProductComponent } from './features/admin-edit-product/admin-edit-product.component';
import { CartComponent } from './features/cart/cart.component';
import { RegisterComponent } from './features/register/register/register.component';
import { LoginComponent } from './features/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'addProduct', component: AdminAddProductComponent },
      { path: 'deleteProduct', component: AdminDeleteProductComponent },
      { path: 'editProduct', component: AdminEditProductComponent },
    ],
  },
];
