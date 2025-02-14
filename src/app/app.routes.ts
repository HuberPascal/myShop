import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { compose } from '@ngrx/store';
import { Component } from '@angular/core';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminComponent } from './features/admin/admin.component';
import { AdminAddProductComponent } from './features/admin-add-product/admin-add-product.component';
import { AdminDeleteProductComponent } from './features/admin-delete-product/admin-delete-product.component';

export const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      { path: 'addProduct', component: AdminAddProductComponent },
      { path: 'deleteProduct', component: AdminDeleteProductComponent },
    ]
  },
  
];
