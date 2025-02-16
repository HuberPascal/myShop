import { Component, inject } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Store } from '@ngrx/store';
import {
  selectProducts,
  selectProductIsLoading,
} from '../store/product.selectors';
import { map, Observable } from 'rxjs';
import { Product } from '../store/product.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormGroupMap } from '../admin-add-product/admin-add-product.component';
import { ProductsActions } from '../store/product.actions';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-delete-product',
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './admin-delete-product.component.html',
  styleUrl: './admin-delete-product.component.scss',
})
export class AdminDeleteProductComponent {
  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  selectedProductLabel$: Observable<string>;

  store = inject(Store<{ products: Product[] }>);

  constructor() {
    this.products$ = this.store.select(selectProducts);
    this.loading$ = this.store.select(selectProductIsLoading);

    this.selectedProductLabel$ = this.products$.pipe(
      map((products) =>
        products.length > 0
          ? `${products[0].brand} ${products[0].name}`
          : 'Kein Produkt verfügbar'
      )
    );
  }

  form = new FormGroup<FormGroupMap<{ selectedProductId: number }>>({
    selectedProductId: new FormControl<number>(0, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  onSubmit() {
    const selectedProductId = this.form.value.selectedProductId;

    if (!selectedProductId === null || selectedProductId === undefined) {
      console.warn('Kein Produkt ausgewählt!');
      return;
    }

    console.log('Produkt wird gelöscht mit ID:', selectedProductId);
    this.store.dispatch(
      ProductsActions.deleteProduct({ id: selectedProductId })
    );
  }
}
